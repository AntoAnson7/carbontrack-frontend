import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const NoDataTakeSurvey = () => {
    const navigate = useNavigate()
  const handleClick = () => {
    localStorage.setItem('temp_access',true)
    navigate('/questionaire')
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection:'column',
        gap:'20px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Dark background for contrast
        
        textAlign: 'center',
        padding: '20px',
        paddingLeft:0
      }}
    >
        <div className="unauth-img">
            <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2F404.png?alt=media&token=4ae5ccc2-5496-4f4f-80b8-07a73813fd4b" style={{width:'400px'}}/>
        </div>
      <div>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem',color: '#abde04'}}>
          No Data Available
        </h1>
        <p style={{ fontSize: '16px', marginBottom: '2rem' }}>
          Uh Oh, You have'nt yet completed our survey, Complete the quick survey to get valuable personalized insights into your carbon footprint!
        </p>

        <Button
          type="primary"
          onClick={handleClick}
          style={{
            backgroundColor: '#abde04',
            borderColor: '#abde04',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Complete Survey
        </Button>
      </div>
    </motion.div>
  );
};

export default NoDataTakeSurvey;
