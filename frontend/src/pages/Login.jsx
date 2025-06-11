import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:8080/auth/login`;
            const response = await axios.post(url, { email, password });
            console.log(response);
            if (response.status === 200) {
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.jwtToken);
                localStorage.setItem('loggedInUser', response.data.name);
                setTimeout(() => {
                    navigate('/home')
                }, 1500)
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || "Login failed");
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Login</button>
                <Link to="/forgot-password">Forgot Password</Link>
                <span>Does't have an account ?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login