import {Col, Row } from 'antd';
import './styles.css';
import { FormRegister } from '../../components/Register/FormRegister';


const RegisterPage = () => {
    
    return(
        <>
        <div className='content-principal'>
            <Row>
                <Col xxl={12} xl={12} lg={12}  md={24} sm={24} xs={24} className="login-first-col">
                    <img src="./scooter.png" alt="" />
                </Col>
                <Col xxl={12} xl={12} lg={12}  md={24} sm={24} xs={24} className="login-second-col">
                    <FormRegister />
                </Col>
            </Row>
        </div>
        </>
    )
}

export default RegisterPage;