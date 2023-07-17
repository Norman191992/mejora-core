import { useState, useEffect } from "react";
import { Card, Form, Tag } from "antd";
import { Button, Input, Table, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getData } from "../../../services/common/getData";
import ProductForm from "../../../components/Forms/ProductForm";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}


const ProductsPage = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [initialData, setInitialData] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [form] = Form.useForm();

    const getProducts = async () => {
        setLoadingData(true);
        const request = await getData("api/scooters/?justActive=" + false);
        if (request.status) {
            setProducts(request.data);
            setInitialData(request.data);
        }
        setLoadingData(false);
    };
    useEffect(() => {
        getProducts();
    }, [refresh]);

    const showModal = (record: any) => {
        setSelectedProduct(record)
        setIsModalOpen(true);
        const { name, price, picture, active, autonomy } = record
        form.setFieldValue('name', name)
        form.setFieldValue('price', price)
        //form.setFieldValue('picture', picture)
        form.setFieldValue('active', active)
        form.setFieldValue('imagen', picture)
        form.setFieldValue('autonomy', autonomy)

    };

    const handleCancel = () => {
        setSelectedProduct({})
        setIsModalOpen(false);
        form.resetFields()
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
            width: "30%"
        },
        {
            title: "Precio",
            dataIndex: "price",
            key: "price",
            width: "20%",
            responsive: ["lg", "xl", "xxl"]
        },
        {
            title: "Foto",
            key: "picture",
            width: "30%",
            render: (record: any) => (
                <img src={record.picture} alt="" height={120} width={120} />
            ),
            responsive: ["lg", "xl", "xxl"]
        },
        {
            title: "Estado",
            key: "active",
            width: "20%",
            render: (record: any) => (
                <p>
                    {record.active ? (
                        <Tag color="blue">Activo</Tag>
                    ) : (
                        <Tag color="red">Inactivo</Tag>
                    )}
                </p>
            ),
            responsive: ["lg", "xl", "xxl"],
            filters: [
                {
                    text: 'Activo',
                    value: 'A',
                },
                {
                    text: 'Inactivo',
                    value: 'I',
                },
            ],
            onFilter: (value: any, record:any) => {
                const parsedValue = value === "I" ? false : true
                return record.active === parsedValue
            }
        },
        {
            title: "Acciones",
            dataIndex: "",
            key: "x",
            render: (record: any) => (
                <Button
                    onClick={() => showModal(record)}
                    type="primary"
                    style={{ marginBottom: 16 }}
                >
                    Editar
                </Button>

            ),
        },
    ];


    return (
        <Card title="Scooters" extra={<Button type="primary" onClick={() => setIsModalOpen(true)} >Agregar scooter</Button>}>
            <Input
                allowClear={true}
                placeholder="Buscar..."
                onChange={(e) => {
                    const value = e.target.value;
                    if (value !== "") {
                        const copy = [...products]
                        const filtered = copy.filter((p) => p.name.toLowerCase().includes(value.toLowerCase()) || p.price.toLowerCase().includes(value.toLowerCase()))
                        setProducts(filtered)
                        return;
                    }
                    if (value === "") {
                        setProducts(initialData)
                    }
                }} />
            <Table loading={loadingData} columns={columns} dataSource={products} />
            <Modal
                title={'name' in selectedProduct ? 'Editar scooter' : 'Nuevo scooter'}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <ProductForm selectedProduct={selectedProduct} setRefresh={setRefresh} handleCancel={handleCancel} form={form} />
            </Modal>
        </Card>
    );
};

export default ProductsPage;


