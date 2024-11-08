// Navbar.jsx
import React, {useEffect, useState} from 'react';

import { useNavigate } from 'react-router-dom';
import './styles.css';
import logo from './logo.png';  // Path to your logo image

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginSignup = () => {
    navigate('/login');
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="brand">
        <span style={{ color: 'black' }}>Carbon</span>
        <span style={{ color: '#abde04' }}>Track</span>
      </div>
      
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="nav-button">
        <button  onClick={handleLoginSignup}>Login / Signup</button>
      </div>
    </div>
  );
};

export default Navbar;
