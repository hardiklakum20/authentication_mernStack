import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleForgot = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/forgot-password', { email });
            if (response.status === 200) {
                toast.success(response.data);
                // setTimeout(() => {
                //     navigate('/login')
                // }, 1000);
            }
        } catch (error) {
            console.log("Axios Error:", error.message);
            toast.error(error.response?.data || "Something went wrong");
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
                <button type='submit'>Submit</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default ForgotPassword