import React from 'react';
import header_img from './header_bg.jpg'
import { Button, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { UserAddOutlined, BarChartOutlined, RiseOutlined, DownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate(); // Using useNavigate hook

  const handleGetStarted = () => {
    navigate('/login'); // Redirect to login page when button is clicked
  };

  const handleScrollDown = () => {
    const element = document.getElementById('content'); // The ID of the content section
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block:'start' });
      setTimeout(() => {
        window.scrollBy(0, -100); // Adjust -60 as per the height of your navbar
      }, 468); // Delay to ensure smooth scrolling completes before offset adjustment
    }
  };


  return (
    <div
      style={{
        backgroundImage: `url(${header_img})`,
        // backgroundImage: 'linear-gradient(to top,#abde04, #ffffff)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width:'100vw',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        color: 'black',
        padding: '0 20px',
      }}
    >
      {/* Heading and Get Started Button */}
      <h1 style={{ fontSize: '40px', marginTop:'25px'}}>Track Your Carbon Footprint</h1>
      <p style={{ fontSize: '20px', marginBottom: '30px', color:'white' }}>
        Take the first step toward a greener future.
      </p>
      <Button
        type="primary"
        size="large"
        onClick={handleGetStarted}
        style={{
          backgroundColor:'black',
          color:'white',
          border:'none',
          fontSize: 'x-large',
          width:'max-content'
        }}
      >
        Get Started
      </Button>

     

      {/* How It Works Cards */}
      <motion.div style={{ marginTop: '40px'}}
        initial = {{opacity:0,y:-100}}
        animate = {{opacity:1,y:0}}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: '#333' }}>How It Works</h2>
        <div style={{padding:'10px', display:'grid' }}>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{
                borderRadius: '100px',
                textAlign: 'center',
                padding: '5px',
                backgroundImage: 'linear-gradient(to top right, #dbff66, #ffffff)',
                border:'none',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
                transition: 'transform 0.3s',
                height: '200px', 
                width:'200px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <UserAddOutlined style={{ fontSize: '30px', fontWeight:'bolder', color: '#abde04', marginBottom: '5px' }} />
              <h6>Sign Up & <br/>Answer Questions</h6>
              <p style={{ color: '#333', fontSize: '10px' }}>
                Sign up and answer a few questions to help us understand your lifestyle.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{
                borderRadius: '100px',
                textAlign: 'center',
                padding: '5px',
                backgroundImage: 'linear-gradient(to top right, #dbff66, #ffffff)',
                // border:'2px solid #abde04',
                border:'none',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
                transition: 'transform 0.3s',
                height: '200px',
                width:'200px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <BarChartOutlined style={{ fontSize: '30px', fontWeight:'bolder', color: '#abde04', marginBottom: '5px' }} />
              <h6>Get Your <br/>Carbon Footprint</h6>
              <p style={{ color: '#333', fontSize: '10px' }}>
                Based on your answers, we will calculate your carbon footprint.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{
                borderRadius: '100px',
                textAlign: 'center',
                padding: '5px',
                backgroundImage: 'linear-gradient(to top right, #dbff66, #ffffff)',
                // border:'2px solid #abde04',
                border:'none',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
                transition: 'transform 0.3s',
                height: '200px',
                width:'200px' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <RiseOutlined style={{ fontSize: '30px', fontWeight:'bolder', color: '#abde04', marginBottom: '5px' }} />
              <h6>Track & Reduce Over Time</h6>
              <p style={{ color: '#333', fontSize: '10px' }}>
                Track your progress and receive tips on reducing your carbon footprint.
              </p>
            </Card>
          </Col>
        </Row>
        </div>
      </motion.div>

       {/* Arrow Down Button */}
       <Button
        type="link"
        icon={<DownOutlined style={{ fontSize: '40px', fontWeight:'bolder', color: 'white' }} />}
        onClick={handleScrollDown}
        hoverable
        style={{ marginTop: '10px'}}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.25)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
  );
};

export default Header;
