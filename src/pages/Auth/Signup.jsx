import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login_Signup.css' 
import { message,Input,Button } from 'antd'; 
import {setUser,clearUser} from '../../Redux/userSlice'
import { useDispatch,useSelector } from 'react-redux';

const Signup = () => {
    const dispatch = useDispatch()
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
        if(formData['confirm_password']==formData['password']){
            try {
                const { confirm_password, ...data } = formData;
                const res = await axios.post('http://127.0.0.1:8000/api/register/', data);
                localStorage.setItem('temp_access',true)
                dispatch(setUser(res.data.user))
                message.success("Registration Successfull!")
                setFormData({ username: '', email: '', password: '',confirm_password:'' });
                navigate('/questionaire');
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
            <img src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2Fsignup.png?alt=media&token=5a8434b5-02a2-4d56-b805-d5fc74a48bd4" alt="" style={{width:'700px'}}/>
            </div>
            
            <div className="auth-right">
                <form classname='auth-form' onSubmit={handleSubmit}>
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
