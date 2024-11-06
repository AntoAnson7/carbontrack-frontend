import React, { useEffect } from 'react'
import { useState } from 'react';
import Transportation from './Transportation';
import HomeEnergy from './HomeEnergy';
import FoodAndDiet from './FoodAndDiet';
import Shopping from './Shopping';
import WasteManagement from './WasteManagement';
import Lifestyle from './Lifestyle';
import { useNavigate } from 'react-router';


const Questionaire = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    !localStorage.getItem('temp_access')&&navigate('/unauthorized')
  },[])

  const [currentForm, setCurrentForm] = useState(0);
  

  const handleSubmit = () => {
    if (currentForm < forms.length - 1) {
      setCurrentForm(currentForm + 1);
    } else {
      localStorage.removeItem('temp_access')

      //? Implement method for logging in user and creating profile 
      navigate('/login')
    }
  };

  const forms = [
    <Transportation submit={handleSubmit}/>,
    <HomeEnergy submit={handleSubmit}/>,
    <FoodAndDiet submit={handleSubmit}/>,
    <Shopping submit={handleSubmit}/>,
    <WasteManagement submit={handleSubmit}/>,
    <Lifestyle submit={handleSubmit}/>,
  ];

  return (
    <div>
      {forms[currentForm]}
    </div>
  );
};

export default Questionaire;