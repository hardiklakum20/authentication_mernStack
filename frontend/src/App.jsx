import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ChangePassword from './pages/ChangePassword.jsx'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to={'/login'} />
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthPage =
      location.pathname === '/login' ||
      location.pathname === '/signup' ||
      location.pathname === '/' ||
      location.pathname === '/forgot-password';

    if (token) {
      setIsAuthenticated(true);
      if (isAuthPage) {
        navigate('/home', { replace: true });
      }
    } else {
      setIsAuthenticated(false);
      if (!isAuthPage) {
        navigate('/login', { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Home />} />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />
      </Routes>
    </>
  )
}

export default App
