import React from 'react'
import { useState } from 'react';
import Transportation from './Transportation';
import HomeEnergy from './HomeEnergy';
import FoodAndDiet from './FoodAndDiet';
import Shopping from './Shopping';
import WasteManagement from './WasteManagement';
import Lifestyle from './Lifestyle';


const Questionaire = () => {
  const [currentForm, setCurrentForm] = useState(0);


  const handleSubmit = (data) => {
    console.log('Form Data:', data);
    if (currentForm < forms.length - 1) {
      setCurrentForm(currentForm + 1);
    } else {
      console.log('All forms submitted');
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