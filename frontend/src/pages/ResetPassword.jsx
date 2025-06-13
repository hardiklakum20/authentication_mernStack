import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            const url = `https://authentication-mern-stack-api.vercel.app/auth/reset-password/${token}`;

            const response = await axios.post(url, { newPassword, confirmPassword });
            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }

    return (
        <div className='container'>
            <h1>Reset</h1>
            <form onSubmit={handleReset}>
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

export default ResetPassword
