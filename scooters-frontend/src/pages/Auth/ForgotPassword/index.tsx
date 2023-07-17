import { Button, Card, Form, Input, Row, message } from "antd";
import { postData } from "../../../services/common/postData";
import './styles.css';

interface IFormData {
    email: string
};

const ForgotPassword = () => {

    const handleFinish = async (data: IFormData) => {
        const request = await postData('api/users/forget-password', data)
        console.log('request', request);
        if('msg' in request){
            message.success(request.msg)
        }
    }

    return (
        <Row justify="center" className="container">
            <Card title="Recuperación de contraseña">
                <Form onFinish={handleFinish} >
                    <Form.Item name="email" extra="Te enviaremos un correo con un enlace para regenerar tu contraseña">
                        <Input placeholder="Ingresa el correo electrónico asociado a tu cuenta" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Enviar Correo</Button>
                </Form>
            </Card>
        </Row>
    )
}

export default ForgotPassword;