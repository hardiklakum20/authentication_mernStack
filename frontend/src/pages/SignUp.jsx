
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const url = `https://authentication-mern-stack-api.vercel.app/auth/signup`;

            const response = await axios.post(url, { name, email, password });
            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || "Registration failed");
        }
    }
    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
