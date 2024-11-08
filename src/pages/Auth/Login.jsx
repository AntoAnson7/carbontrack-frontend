import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/userSlice';
import { setProfile } from '../../Redux/profileSlice';
import LoginForm from './LoginForm';
import './Login_Signup.css';

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
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2Flogin.png?alt=media&token=904943fd-77b2-42fa-bf3d-a55ec1ad1f1e" 
          alt="" 
          style={{ width: '400px' }}
        />
      </div>
      
      <div className="auth-right">
        <div className='auth-form'>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Login;
