import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleForgot = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/forgot-password', { email, newPassword, confirmPassword });
            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }

    }

    return (
        <div className='container'>
            <h1>Forgot</h1>
            <form onSubmit={handleForgot}>
                <div>
                    <label htmlFor='name'>Email</label>
                    <input
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your Email...'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='Password'>New Password</label>
                    <input
                        type='password'
                        name='Password'
                        placeholder='Enter your New Password...'
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Confirm Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter your confirm password...'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default ForgotPassword