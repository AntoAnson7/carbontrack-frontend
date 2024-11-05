import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { motion } from 'framer-motion';

const Shopping = ({submit}) => {
  const [clothingPurchase, setClothingPurchase] = useState('');
  const [generalPurchases, setGeneralPurchases] = useState('');
  const [recycling, setRecycling] = useState('');

  const handleSubmit = () => {
    submit({ clothingPurchase, generalPurchases, recycling });
    console.log("Shopping Posted");
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='transportation'
  >
    <div className="questionaire">
      <div className="t-top">
        <img src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2Fshopping.png?alt=media&token=5744efab-27f3-4182-89ee-f33c1d28fd5e" alt="" />
      </div>
      <form className="t-form">
        <div>
        <label>How often do you buy new clothes?</label>
          <Select placeholder="Select Clothing Purchase Frequency" onChange={setClothingPurchase} style={{ width: '100%' }}>
            <Select.Option value="WEEKLY">Weekly</Select.Option>
            <Select.Option value="MONTHLY">Monthly</Select.Option>
            <Select.Option value="QUARTERLY">Quarterly</Select.Option>
            <Select.Option value="YEARLY">Yearly</Select.Option>
          </Select>
        </div>
        <div>
        <label>What is your general purchase frequency? (Electronics, Accessories etc..)</label>
          <Select placeholder="Select General Purchase Frequency" onChange={setGeneralPurchases} style={{ width: '100%' }}>
            <Select.Option value="WEEKLY">Weekly</Select.Option>
            <Select.Option value="MONTHLY">Monthly</Select.Option>
            <Select.Option value="QUARTERLY">Quarterly</Select.Option>
            <Select.Option value="YEARLY">Yearly</Select.Option>
          </Select>
        </div>
        <div>
          <label>What are your recycling habits?</label>
          <Select placeholder="Select Recycling Habits" onChange={setRecycling} style={{ width: '100%' }}>
            <Select.Option value="MOST">Most</Select.Option>
            <Select.Option value="ABOUT_HALF">About Half</Select.Option>
            <Select.Option value="SOME">Some</Select.Option>
            <Select.Option value="NONE">None</Select.Option>
          </Select>
        </div>
        <div className="shopping-submit">
          <Button type='primary' style={{backgroundColor:'#abde04'}} onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  </motion.div>
  );
};

export default Shopping;
