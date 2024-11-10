
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';  
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();


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
        <Link to="/login" style={{borderRadius:'5px'}}>Login</Link>
        {!localStorage.getItem('token')?
          <Link to="/register" classname='get-started' style={{
          border:'1px solid black',
          borderRadius:'5px',
        }}>
          Get Started
          </Link>


        :<Link to="/dashboard" style={{
          border:'1px solid black',
          borderRadius:'5px',
        }}>Dashboard</Link>}
      </div>
    </div>
  );
};

export default Navbar;
