import { Button, Card, Form, Input, Row, message } from "antd";
import { postData } from "../../../services/common/postData";
import '../ForgotPassword/styles.css';
import { useParams } from 'react-router-dom';


interface IFormData {
    password: string
};

const NewPassword = () => {

    let { token } = useParams();

    const handleFinish = async (data: IFormData) => {
        const request = await postData('api/users/forget-password/' + token, data)
        console.log('request', request);
        if ('msg' in request) {
            message.success(request.msg)
        }
    }

    return (
        <Row justify="center" className="container">
            <Card title="Nueva contraseña">
                <Form onFinish={handleFinish} >
                    <Form.Item name="password">
                        <Input placeholder="Ingresa la nueva contraseña" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Guardar nueva contraseña</Button>
                </Form>
            </Card>
        </Row>
    )
}

export default NewPassword;