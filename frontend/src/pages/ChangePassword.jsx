import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/change-password`, { oldPassword, newPassword, confirmPassword }, {
                headers: {
                    Authorization: token
                }
            });
            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    localStorage.removeItem('token')
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
            <h1>Change Password</h1>
            <form onSubmit={handleChange}>
                <div>
                    <label htmlFor='name'>Old Password</label>
                    <input
                        type='password'
                        name='name'
                        autoFocus
                        placeholder='Enter your Email...'
                        onChange={(e) => setOldPassword(e.target.value)}
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

export default ChangePassword
