import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login_Signup.css' // Import useNavigate

const Signup = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
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
            await axios.post('http://yourapiurl/api/signup/', formData);
            setSuccessMessage('Signup successful! Please log in.');
            setFormData({ username: '', email: '', password: '' }); // Reset form
            // Redirect to login page after a successful signup
            navigate('/login'); // Update to your actual login route
        } catch (err) {
            if (err.response) {
                setError(err.response.data.detail || 'An error occurred. Please try again.');
            } else {
                setError('Network error. Please try again later.');
            }
        }
    };

    return (
        <div className="signup-container">
            
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2><br/>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
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
                
                    <input
                        type="password"
                        name="password"
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                    />
                
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
