import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';

const Unauthorized = () => {
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
                src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2Fundraw_under_construction_46pa.png?alt=media&token=c63629ec-d054-4d58-90f2-bf825d6025b8" style={{width:'500px'}}/>
        </div>
      <div>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem',color: '#abde04'}}>
          Page Unavailable
        </h1>
        <p style={{ fontSize: '16px', marginBottom: '2rem' }}>
          Uh Oh, The page you're looking for is unavailable, Make sure to double check the url's!
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
        </div>
      </div>
    </motion.div>
  );
};

export default Unauthorized;
