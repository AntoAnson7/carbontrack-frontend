import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const Unauthorized = () => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        height: '80vh',
        display: 'flex',
        flexDirection:'column',
        gap:'20px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Dark background for contrast
        
        textAlign: 'center',
        padding: '20px',
      }}
    >
        <div className="unauth-img">
            <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2F404.png?alt=media&token=4ae5ccc2-5496-4f4f-80b8-07a73813fd4b" style={{width:'500px'}}/>
        </div>
      <div>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem',color: '#abde04'}}>
          403 Unauthorized
        </h1>
        <p style={{ fontSize: '16px', marginBottom: '2rem' }}>
          Uh Oh, You don’t have permission to access this page {!localStorage.getItem('token')&&"Try signing in to see if it resolves the issue!" }!
        </p>

        <div className="resolve-links" style={{display:'flex',gap:'15px',justifyContent:'center'}}>
          <Button
            type="primary"
            onClick={handleGoBack}
            style={{
              backgroundColor: '#abde04',
              borderColor: '#abde04',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Go Back
          </Button>
          {!localStorage.getItem('token')&&<Button
            type="primary"
            onClick={()=>navigate('/login')}
            style={{
              backgroundColor: '#abde04',
              borderColor: '#abde04',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Log in
          </Button>}
        </div>
      </div>
    </motion.div>
  );
};

export default Unauthorized;
