import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://yourapiurl/api/login/', formData);
            // Assuming the response contains a token or user info
            localStorage.setItem('token', response.data.token); // Store token if using JWT
            setSuccessMessage('Login successful!');
            // Redirect to dashboard or another page after login
            navigate('/dashboard'); // Update to your actual dashboard route
        } catch (err) {
            if (err.response) {
                setError(err.response.data.detail || 'Login failed. Please try again.');
            } else {
                setError('Network error. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container">
            
            <form onSubmit={handleSubmit}>
            <h2>Log In</h2>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
               
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <button type="submit">Log In</button>
                <br/>
                <Link to="/signup" style={{fontFamily:"Trebuchet MS"}}>Don't have an account? <span>Sign Up.</span></Link>
            </form>
        </div>
    );
};

export default Login;
