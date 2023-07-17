import { useNavigate } from "react-router-dom";
import { Layout, Menu, Row, Col, Button, Form, Input, message, Card as AntCard } from "antd";
import MainBanner from "../../../components/Home/MainBanner";
import "./styles.css";
import Card from "../../../components/Home/Card";
import {
  LinkedinOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { postData } from "../../../services/common/postData";
import Slider from "../../../components/Home/Slider";

const { Header, Content, Footer } = Layout;

const MainBannerOne = () => {
  return (
    <MainBanner
      titleOne="Scooters eléctricos"
      titleTwo="movilidad"
      titleThree="inteligente"
      TextContent="Los scooters eléctricos representan una opción versátil, ecológica y conveniente para la movilidad urbana. Con su diseño compacto, funcionamiento silencioso y bajo costo de operación, se han convertido en una alternativa popular para aquellos que buscan una forma eficiente y sostenible de desplazarse por la ciudad."
      buttonTitle="Ver catálogo"
      image="./slide2.jpg"
    />
  );
};

const MainBannerTwo = () => {
  return (
    <MainBanner
      titleTwo="Hay muchas razónes para usarlos"
      TextContent="Una de las ventajas clave de los scooters eléctricos es su facilidad de uso y maniobrabilidad. Son livianos, compactos y fáciles de maniobrar en espacios reducidos. Esto los convierte en una excelente opción para desplazamientos cortos y para sortear el tráfico urbano congestionado. Además, algunos modelos cuentan con características adicionales, como luces, frenos regenerativos y sistemas de suspensión, que mejoran la comodidad y la seguridad del usuario."
      buttonTitle="Ver catálogo"
      image="./slide1.jpg"
    />
  );
};

const FormBanner = () => {
  const handleFinish = async (data: any) => {
    const request = await postData("api/users/info", data);
    console.log("request", request);
    if ("msg" in request) {
      message.success(request.msg);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" style={{ marginBottom: 20 }}>
      <Col
        className="stat-col"
        xs={24}
        sm={24}
        md={24}
        lg={5}
        xl={5}
        xxl={5}
      ></Col>
      <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
        <Form
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre"
            name="firstname"
            rules={[{ required: true, message: "Ingrese su Nombre" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Telefono"
            name="phone"
            rules={[{ required: true, message: "Ingrese su Telefono" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Ingrese su Email" }]}
          >
            <Input />
          </Form.Item>

          <div style={{ display: 'flex', flexDirection:'row', justifyContent:'center' }}>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </div>
        </Form>
      </Col>
      <Col
        className="stat-col"
        xs={24}
        sm={24}
        md={24}
        lg={5}
        xl={5}
        xxl={5}
      ></Col>
    </Row>
  );
};

const Stats = () => {
  return (
    <div>
      <Row className="stats-title-row" justify="center">
        Nuestros resultados en números
      </Row>
      <Row className="stats-row" justify="center">
        <Col className="stat-col" xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
          99%
          <span className="stat-name">Satisfacción del cliente</span>
        </Col>
        <Col className="stat-col" xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
          15k
          <span className="stat-name">Pacientes en línea</span>
        </Col>
        <Col
          className="stat-col bottom-stat"
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          xxl={6}
        >
          12k
          <span className="stat-name">Pacientes atendidos</span>
        </Col>
        <Col
          className="stat-col bottom-stat"
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          xxl={6}
        >
          240%
          <span className="stat-name">Crecimiento de compañía</span>
        </Col>
      </Row>
    </div>
  );
};

const FooterContent = () => {
  return (
    <div className="footer-Content">
      <Row>
        <Col
          style={{ textAlign: "left" }}
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
        >
          <span className="stat-footer">Scooters UIO</span>
          <span className="stat-footer">
            Copyright © 2023 | All Rights Reserved{" "}
          </span>
        </Col>

        <Col
          style={{ textAlign: "center" }}
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
        >
          <span style={{ fontWeight: "bolder" }} className="stat-footer">
            OFRECEMOS{" "}
          </span>
          <span className="stat-footer">Scooters eléctricos</span>
          <span className="stat-footer">Implementos</span>
          <span className="stat-footer">Repuestos</span>
        </Col>
        <Col
          style={{ textAlign: "center" }}
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
        >
          <span style={{ fontWeight: "bolder" }} className="stat-footer">
            SIGUENOS{" "}
          </span>
          <span>
            <Button type="text" href="https://www.facebook.com/">
              <FacebookOutlined />
            </Button>
          </span>
          <span>
            <Button type="text" href="https://twitter.com/">
              <TwitterOutlined />
            </Button>
          </span>
          <span>
            <Button type="text" href="https://www.instagram.com/">
              <InstagramOutlined />
            </Button>
          </span>
          <span>
            <Button type="text" href="https://www.linkedin.com/">
              <LinkedinOutlined />
            </Button>
          </span>
          <span>
            <Button type="text" href="https://www.youtube.com/">
              <YoutubeOutlined />
            </Button>
          </span>
        </Col>
      </Row>
    </div>
  );
};

const InfoPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          color: "white",
          marginTop: 0,
          backgroundColor: "#ffa500",
        }}
      >
        <div
          style={{
            float: "left",
            width: 120,
            height: 31,
          }}
        >
          Scooters UIO
        </div>
        <Menu
          className="info-navbar-menu"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            background: "transparent",
            color: "white",
          }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "home",
              label: "Inicio",
            },
            {
              key: "signin",
              label: "Iniciar Sesión",
              onClick: () => navigate("/login"),
              style: {
                fontWeight: "bolder",
                color: "white",
              },
            },
            {
              key: "signup",
              label: "Registrarse",
              onClick: () => navigate("/register"),
              style: {
                fontWeight: "bolder",
                color: "white",
              },
            },
          ]}
        />
      </Header>

      <Content className="site-layout">
        <div style={{ minHeight: 380 }}>
          <div className="Banners">
            <MainBannerOne />
          </div>

          <Row className="banner-row">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              xxl={24}
              className="Main-title"
            >
              <h1 style={{ color: "#ffa500" }}>Beneficios</h1>
            </Col>
          </Row>
          <div className="banner-cards-One">
            <Card
              heightCard="extra"
              image="./slide1.jpg"
              title="Sostenibilidad"
              content=" Son respetuosos con el medio ambiente al no emitir gases contaminantes ni generar emisiones de escape." />
            <Card
              heightCard="extra"
              image="./slide4.jpg"
              title="Movilidad eficiente"
              content="Son ágiles y se desplazan fácilmente en el tráfico urbano, ahorrando tiempo en desplazamientos cortos." />
            <Card
              heightCard="extra"
              image="./slide3.jpg"
              title="Costo reducido"
              content="Tienen un costo de operación más bajo en comparación con los vehículos de combustión interna, tanto en combustible como en mantenimiento." />
            <Card
              heightCard="extra"
              image="./slide2.jpg"
              title="Sostenibilidad"
              content=" Son respetuosos con el medio ambiente al no emitir gases contaminantes ni generar emisiones de escape." />
            
          </div>
          
          <Row className="banner-row">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              xxl={24}
              className="Main-title"
            >
              <h1 style={{ color: "#ffa500" }}>Testimonios</h1>
            </Col>
          </Row>
          <div className="banner-cards-One">
            <Card
              heightCard="third"
              image="./cara4.jpg"
              title="Muy feliz con su servicio"
              contentTwo="sus representantes siempre han sido muy amables, 
              serviciales y profesionales. Agradezco sus recordatorios por correo 
              electrónico. Muy feliz con sus suministros y servicio"
              content="John Carter"
            />
            <Card
              heightCard="third"
              image="./cara5.jpg"
              title="Excelente servicio al cliente"
              contentTwo="Muchas gracias por ayudar a sus clientes, son los mejores. Gracias 
              por siempre tratar de encontrar una solución para ayudarme."
              content="Sophie Moore"
            />
            <Card
              heightCard="third"
              image="./cara6.jpg"
              title="Excelente servicio"
              contentTwo="Estoy muy satisfecho con el excelente servicio, 
              la buena calidad del producto y la rapidez de la entrega. Gracias!"
              content="Andy Smith"
            />
            <Card
              heightCard="third"
              image="./cara7.jpg"
              title="Buena atencion"
              contentTwo="Tuve una excelente experiencia con Sandra! Fue muy servicial y
               simpática cuando pedí por primera vez información. ¡Recomendaría a Sandra!"
              content="Donal Matt"
            />
          </div>
          <Row className="banner-row">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              xxl={24}
              className="Main-title"
            >
              <h1>Contáctanos</h1>
            </Col>
          </Row>
          <FormBanner />
        </div>
      </Content>
      <Footer className="footer-Content">
        <FooterContent />
      </Footer>
    </Layout>
  );
};

export default InfoPage;
