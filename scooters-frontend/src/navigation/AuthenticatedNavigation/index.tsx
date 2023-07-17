/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { Navbar } from "../../components/Navbar";
import { SideBar } from "../../components/Sidebar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProductsPage from "../../pages/Admin/ProductsPage";
import CustomersPage from "../../pages/Admin/CustomersPage";
import PersonalPage from "../../pages/Admin/PersonalPage";
import CatalogPage from "../../pages/Customer/CatalogPage";

const AuthenticatedNavigation = () => {

  const navigate = useNavigate();
  const { user }: any = useContext(AuthContext);


  useEffect(() => {
    user.isAdmin && navigate("/scooters");
    user.isCustomer && navigate("/catalogo");
  }, []);


  return (
    <>
      <Layout>
        <Navbar />
        <SideBar>
          {user.isAdmin && (
            <Routes>
              <Route path="scooters" element={<ProductsPage />} />
              <Route path="clientes" element={<CustomersPage />} />
              <Route path="personal" element={<PersonalPage />} />
            </Routes>
          )}

          {user.isCustomer && (
            <Routes>
              <Route path="catalogo" element={<CatalogPage />} />
            </Routes>
          )}

        </SideBar>
      </Layout>
    </>
  );
};

export default AuthenticatedNavigation;