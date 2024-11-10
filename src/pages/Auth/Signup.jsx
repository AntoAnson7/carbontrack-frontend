import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { message,Input } from 'antd'; 
import mainbg from './bgtest1.jpg'
import './Auth.css' 

const Signup = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
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
        if(formData['confirm_password']===formData['password']){
            try {
                const { confirm_password, ...data } = formData;
                const res = await axios.post('http://127.0.0.1:8000/api/register/', data);
                
                message.success("Registration Successfull, Login to continue!")
                setFormData({ username: '', email: '', password: '',confirm_password:'' });
                navigate('/login');
            } catch (err) {
                if (err.response) {
                    console.log(err.response)
                    message.error(`An error occurred. Please try again. ${err.response.data.msg}`);
                } else {
                    message.error('Uh Oh, The server seems to be down!');
                }
            }
        }
        else{
            message.error('Passwords dont match!')
        }


    };

    return (
        <div className="signup-container">

            <div className="auth-left">
                <img src={mainbg} style={{width:'100%',minHeight:'100vh'}} />
            </div>

            <div className="gradient-box"></div>

            <div className="auth-right">
                <form classname='auth-form' onSubmit={handleSubmit} style={{maxWidth:'70%'}}>
                    <h1>Register</h1>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
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
                
                        <Input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                        />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
