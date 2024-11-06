import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { message,Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../Redux/userSlice';
import './Login_Signup.css'

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user.user)
    
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login/', formData);
            console.log(res.data)
            localStorage.setItem('token', res.data.access); 
            dispatch(setUser(res.data.user))
            message.success('Login Successful!');
            navigate('/');
        } catch (err) {
            if (err.response) {
                message.error(err.response.data.msg || 'Login failed. Please try again.');
            } else {
                message.error('Network error. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="auth-left">
                <img src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2Flogin.png?alt=media&token=904943fd-77b2-42fa-bf3d-a55ec1ad1f1e" alt="" style={{width:'700px'}}/>
            </div>
            
            <div className="auth-right">
                <form className='auth-form' onSubmit={handleSubmit}>
                    <h1>Login</h1>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    <button type="submit">Log In</button>
                    <br/>
                    <Link to="/register">Don't have an account? <span>Sign Up.</span></Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
