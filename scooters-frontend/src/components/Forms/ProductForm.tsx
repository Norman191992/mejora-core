import { Button, Form, Input, Select, Upload, message } from "antd";
import { postData } from "../../services/common/postData";
import { putData } from "../../services/common/putData";
import { PlusOutlined } from "@ant-design/icons";
import { postFormData } from '../../services/common/postData';
import type { RcFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react'

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const ProductForm = ({ selectedProduct, setRefresh, handleCancel, form }: any) => {

    const handleCloseModal = () => {
        setRefresh((prevState: boolean) => !prevState)
        handleCancel()
    }

    const [imageUrl, setImageUrl] = useState("")

    const onFinish = async (values: any) => {

        try {

            console.log('type', typeof (values.imagen))
            let pictureUrl = ""
            if (values.imagen) {
                const cloudName = "dhmozdnjd";
                const uploadPreset = "videoPreset";
                // Crear un objeto FormData para enviar el archivo de video
                const formData = new FormData();
                formData.append("file", values.imagen);
                // formData.append("upload_preset", uploadPreset);

                // Realizar una solicitud POST a Cloudinary
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                // Obtener la respuesta en formato JSON
                const data = await response.json();

                // Verificar la respuesta de Cloudinary
                if (response.ok) {
                    console.log("El video se ha guardado correctamente en Cloudinary.");
                    console.log("URL del video en Cloudinary:", data.secure_url);
                    message.success("Imagen procesada exitosamente!")
                    pictureUrl = data.secure_url
                } else {
                    alert('Hubo un problema al cargar los archivos, por favor intenta de nuevo')
                    //setProcessing(false);

                    setImageUrl("")
                    return;
                }                    
            } else {
                message.error("No has seleccionado ninguna imagen!")

                setImageUrl("")
                return;
                // setProcessing(false);
            }


            const fullValues = {
                ...values,
                picture: pictureUrl
            }

            if ('name' in selectedProduct) {


                const request = await putData("api/scooters/" + selectedProduct._id, fullValues);
                if (request.status) {
                    message.success("Scooter editado correctamente");
                    setImageUrl("")
                    handleCloseModal();
                    return;
                }
                setImageUrl("")
                message.error("Ha existido un error!")
            } else {
                const request = await postData("api/scooters", {...fullValues, ratings: []});
                if (request.status) {
                    message.success("Scooter agregado correctamente");
                    setImageUrl("")
                    handleCloseModal();
                    return;
                }
                setImageUrl("")
                message.error("Ha existido un error!")
            }
        } catch (error: any) {
            console.log(error.response);
            message.success(error.response.data.msg);
            setImageUrl("")
        }
    };


    const { Option } = Select;


    const getFile = (e: any) => {

        getBase64(e.file.originFileObj as RcFile, (url) => {
            setImageUrl(url);
        });

        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            console.log('is arrayy!!')
            return e
        }
        return e && e.file.originFileObj;
    };

    return (
        <Form
            onFinish={onFinish}
            form={form}
        >
            <Form.Item
                label="Fotografía"
                name='imagen'
                getValueFromEvent={getFile}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                >
                    {(form.getFieldValue("imagen") && imageUrl === "") && <img src={form.getFieldValue("imagen")} alt="avatar" style={{ width: '100%' }} />    }
                    {(imageUrl!== "" ) && <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> }
                    {(typeof(form.getFieldValue("imagen"))==="undefined" && imageUrl === "") && ( 
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Subir foto</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>
            <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: "Campo requerido" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Precio"
                name="price"
                rules={[{ required: true, message: "Campo requerido" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Autonomía"
                name="autonomy"
                rules={[{ required: true, message: "Campo requerido" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Estado"
                name="active"
                rules={[{ required: true, message: "Campo requerido" }]}
                extra="El estado inactivo implica que el scooter no va a ser visible para los clientes"
            >
                <Select placeholder="Seleccione un estado">
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option>
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProductForm;