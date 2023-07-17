import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from '../../pages/Auth/LoginPage';
import InfoPage from '../../pages/AllUsers/InfoPage';
import RegisterPage from '../../pages/Auth/RegisterPage';
import ForgotPassword from '../../pages/Auth/ForgotPassword';
import NewPassword from '../../pages/Auth/NewPassword';
import { useEffect } from 'react';

const UnauthenticatedNavigation = () => {
  const navigate = useNavigate()
  const location:any = useLocation()

  useEffect(() => {
    if(location.pathname==="/login" || location.pathname==="/register" || location.pathname.includes("/forget-password")){
      console.log('All fine!')
      return;
    }
    console.log('No auth found, redirecting...')
    navigate("/")
  }, [])

  
  return (
    <Routes>
      <Route path="/" element={<InfoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/forget-password/:token" element={<NewPassword />} />
    </Routes>
  )
}

export default UnauthenticatedNavigation;