import React, { useState } from 'react';
import { Select, InputNumber, Button } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';
import { message } from 'antd';
import { useSelector } from 'react-redux';

const FoodAndDiet = ({submit}) => {
  const user = useSelector((state)=>state.user.user)

  const [dietType, setDietType] = useState('');
  const [mealFrequency, setMealFrequency] = useState(0);
  const [foodSource, setFoodSource] = useState('');

  const handleSubmit = async() => {
    const data = {
      "diet_type":dietType,
      "dairy_meat_meal_frequency":mealFrequency,
      "food_source":foodSource,
      "username":user.username
    }

    try{
      const res = await axios.post('http://127.0.0.1:8000/api/fooddiet/',data)
      message.success('Food and Diet details received!')
      submit()
    }catch(err){
      if(err.response){
        message.error(err.response.data.msg)
      }
      else{
        message.error("Network Error!")
      }
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='transportation'
  >
      <div className='questionaire'>
        <div className="t-top">
          <img src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2Ffood.png?alt=media&token=29ea582c-4927-4626-91a5-e00b2fcae96a" alt="" style={{width:'49%'}}/>
        </div>
        <form className="t-form">
          <div className="diet-type">
            <label>What is your diet type?</label>
            <Select placeholder="Select Diet Type" onChange={setDietType} style={{ width: '100%' }}>
              <Select.Option value="VEGAN">Vegan</Select.Option>
              <Select.Option value="VEGETARIAN">Vegetarian</Select.Option>
              <Select.Option value="PESCATARIAN">Pescatarian</Select.Option>
              <Select.Option value="OMNIVORE">Omnivore</Select.Option>
              <Select.Option value="MEAT_HEAVY">Meat-Heavy</Select.Option>
            </Select>
          </div>

          <div className="meal-freq">
            <label>How many diary or meat inclusive meals are in your day?</label>
            <InputNumber min={0} value={mealFrequency} onChange={setMealFrequency} placeholder="Dairy/Meat Meal Frequency" />
          </div>

          <div className="food-source">
          <label>How often does your food come from organic sources?</label>
            <Select placeholder="Select Food Source" onChange={setFoodSource} style={{ width: '100%' }}>
              <Select.Option value="ALWAYS">Always</Select.Option>
              <Select.Option value="OFTEN">Often</Select.Option>
              <Select.Option value="SOMETIMES">Sometimes</Select.Option>
              <Select.Option value="RARELY">Rarely</Select.Option>
              <Select.Option value="NEVER">Never</Select.Option>
            </Select>
          </div>
          <div className="food-submit">
            <Button type='primary' style={{backgroundColor:'#abde04'}} onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default FoodAndDiet;
