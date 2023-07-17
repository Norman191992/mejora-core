import { Button, Form, Input, message } from "antd";
import { postData } from "../../services/common/postData";

const PersonalForm = ({ handleCancel, setSpecialists, specialists }: any) => {
  const onFinish = async (values: any) => {
    try {
        const request = await postData("api/users/admins", values);
        setSpecialists([...specialists, request.msg]);
        if (request.status) {
          handleCancel();
          message.success("Administrador agregado correctamente");
          return; 
        }

        message.error("Algo salió mal, es posible que ya exista un usuario con el correo especificado")
        return;
    } catch (error: any) {
      console.log(error.response);
      message.success(error.response.data.msg);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nombre"
        name="firstname"
        rules={[{ required: true, message: "Se requiere un Nombre" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Apellido"
        name="lastname"
        rules={[{ required: true, message: "Se requiere un Apellido" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Se requiere un Email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalForm;
