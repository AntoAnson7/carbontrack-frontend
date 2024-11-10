
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';  
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  // const handleLoginSignup = () => {
  //   navigate('/login');
  // };

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
        <span style={{ color: 'black' }}>CARBON</span>
        <span style={{ color: '#abde04' }}>TRACK</span>
      </div>
      
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
};

export default Navbar;
