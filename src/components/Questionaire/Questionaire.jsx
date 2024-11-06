import React, { useEffect } from 'react'
import { useState } from 'react';
import Transportation from './Transportation';
import HomeEnergy from './HomeEnergy';
import FoodAndDiet from './FoodAndDiet';
import Shopping from './Shopping';
import WasteManagement from './WasteManagement';
import Lifestyle from './Lifestyle';
import { useNavigate } from 'react-router';
import { setProfile } from '../../Redux/profileSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { message } from 'antd';


const Questionaire = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    !localStorage.getItem('temp_access')&&navigate('/unauthorized')
  },[navigate])

  const [currentForm, setCurrentForm] = useState(0);
  

  const handleSubmit = async() => {
    if (currentForm < forms.length - 1) {
      setCurrentForm(currentForm + 1);
    } else {
      localStorage.removeItem('temp_access')
      //? Create a user profile with provided data
      const profile = await axios.post('http://127.0.0.1:8000/api/profile/',{},{
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    })
      message.info('Survey Completed!')
      dispatch(setProfile(profile.data))
      navigate('/dashboard')
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