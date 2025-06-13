import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Home() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [product, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        setTimeout(() => {
            navigate('/login');
            toast.success('Logout successful');
        }, 1000)
    }

    const fetchProduct = async () => {
        try {
            const url = `https://authentication-mern-stack-api.vercel.app/products`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await axios.get(url, headers);
            // console.log(response);
            setProducts(response.data);

        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [])


    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                <ul>
                    {
                        product.map((product) => (
                            <li key={product.id}>{product.name}: {product.price} onClick(state:product)</li>
                        ))
                    }
                </ul>
            </div>
            <Link to={'/change-password'}>Change Password</Link>
            <ToastContainer />
        </div>
    )
}

export default Home
