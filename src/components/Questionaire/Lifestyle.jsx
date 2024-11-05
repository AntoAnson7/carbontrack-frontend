import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { motion } from 'framer-motion';

const Lifestyle = ({submit}) => {
  const [energySaving, setEnergySaving] = useState('');
  const [waterUsage, setWaterUsage] = useState('');

  const handleSubmit = () => {
    submit({ energySaving, waterUsage });
    console.log("Lifestyle Posted");
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
        <img src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2Flifestyle.png?alt=media&token=3e8d1efa-d8ad-4201-8630-45e53e8aaf7f" alt="" />
      </div>
      <form action="" className="t-form">
        <div>
          <label>Choose what best describes your energy saving habits?</label>
          <Select placeholder="Energy Saving Habits" onChange={setEnergySaving} style={{ width: '100%' }}>
            <Select.Option value="ALWAYS">Always</Select.Option>
            <Select.Option value="OFTEN">Often</Select.Option>
            <Select.Option value="SOMETIMES">Sometimes</Select.Option>
            <Select.Option value="RARELY">Rarely</Select.Option>
            <Select.Option value="NEVER">Never</Select.Option>
          </Select>
        </div>
        <div>
        <label>Choose what best describes your water usage habits?</label>
          <Select placeholder="Water Usage Habits" onChange={setWaterUsage} style={{ width: '100%' }}>
            <Select.Option value="CONSCIOUS">Conscious</Select.Option>
            <Select.Option value="SOMETIMES">Sometimes</Select.Option>
            <Select.Option value="RARELY">Rarely</Select.Option>
            <Select.Option value="NEVER">Never</Select.Option>
          </Select>
        </div>
        <div className="lifestyle-submit">
          <Button type='primary' style={{backgroundColor:'#abde04'}} onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  </motion.div>
  );
};

export default Lifestyle;
