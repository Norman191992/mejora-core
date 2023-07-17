import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Layout, Menu, MenuTheme, Modal } from "antd";
import {
  FolderOpenOutlined,
  MenuOutlined,
  UserOutlined,
  DashboardOutlined,
  CalendarOutlined,
  FolderOutlined,
  TeamOutlined,
  WomanOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
  CameraOutlined,
  ManOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import "./styles.css";
import { AuthContext } from "../../context/AuthContext";

interface IMenuOptionsProps {
  theme?: MenuTheme;
}

const MenuOptions = ({ theme = "dark" }: IMenuOptionsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user }: any = useContext(AuthContext);

  const goToPage = (page: string) => {
    //Se valida que la ruta la que quiero ir es diferente a la de origen, sino no tiene sentido navegar ni reiniciar el state de items
    if (location.pathname !== page) {
      navigate(page);
    }
  };

  return (
    <Menu theme={theme} defaultSelectedKeys={["1"]} mode="inline">
      {user.isAdmin && (
        <>
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            className="navbar-brand"
            onClick={() => goToPage("/scooters")}
          >
            Scooters
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<ManOutlined />}
            className="navbar-brand"
            onClick={() => goToPage("/clientes")}
          >
            Clientes
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<TeamOutlined />}
            className="navbar-brand"
            onClick={() => goToPage("/personal")}
          >
            Personal
          </Menu.Item>
        </>
      )}
      {user.isCustomer && (
        <>
          <Menu.Item
            key="1"
            icon={<ShopOutlined />}
            className="navbar-brand"
            onClick={() => goToPage("/catalogo")}
          >
            Catálogo
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mobile-menu">
      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setIsOpen(true)}
      />
      <Modal open={isOpen} footer={null} onCancel={() => setIsOpen(false)}>
        <div style={{ marginTop: 20 }}>
          <MenuOptions theme="light" />
        </div>
      </Modal>
    </div>
  );
};

export const SideBar = ({ children }: any) => {
  const { Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsedt] = useState(false);
  const onCollapse = (collapsed: boolean) => setCollapsedt(collapsed);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className="desktop-sidebar"
        >
          <div className="logo" />
          <MenuOptions />
        </Sider>

        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Layout
              className="site-layout"
              style={{ backgroundColor: "white" }}
            >
              <Content>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  {children}
                </div>
                <MobileMenu />
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Scooters UIO
              </Footer>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
