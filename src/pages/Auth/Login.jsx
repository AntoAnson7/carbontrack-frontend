import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/userSlice';
import { setProfile } from '../../Redux/profileSlice';
import LoginForm from './LoginForm';
import './Auth.css';
import mainbg from './bgtest1.jpg'

const Login = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', values);
      const profile = await axios.get('http://127.0.0.1:8000/api/profile/', {
        headers: {
          Authorization: `Bearer ${res.data.access}`
        }
      });

      profile.data.length > 0 && dispatch(setProfile(profile.data[0]));
      localStorage.setItem('token', res.data.access); 
      dispatch(setUser(res.data.user));
      message.success('Login Successful!');
      navigate('/dashboard');
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

        <img src={mainbg} style={{width:'100%',minHeight:'100vh'}} />
      </div>
      <div className="gradient-box"></div>


      <div className="auth-right">
          <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;
