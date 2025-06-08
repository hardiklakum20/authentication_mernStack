
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

        if (!name || !email || !password) {
            return toast.error('name, email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await axios.post(url, { name, email, password });
            const { success, message, error } = response.data;
            if (success) {
                toast.success(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message || "Something went wrong";
                toast.error(details);
            } else if (!success) {
                toast.error(message || "Signup failed");
            }
            console.log(result);
        } catch (err) {
            toast.error(err.message || "Something went wrong");
            console.error("Signup error:", err);
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
