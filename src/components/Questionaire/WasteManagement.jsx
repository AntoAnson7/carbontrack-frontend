import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { motion } from 'framer-motion';

const WasteManagement = ({submit}) => {
  const [wasteDisposal, setWasteDisposal] = useState('');
  const [composting, setComposting] = useState('');

  const handleSubmit = () => {
    submit({ wasteDisposal, composting });
    console.log("Waste Management Posted");
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
        <img src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2Fwaste.png?alt=media&token=5a1917fc-d10c-4e6a-a9b4-acbeb1642732" alt="" />
      </div>
      <form className="t-form">
        <div>
          <label>How often do you dispose you general waste?</label>
          <Select placeholder="Select Waste Disposal Frequency" onChange={setWasteDisposal} style={{ width: '100%' }}>
            <Select.Option value="DAILY">Daily</Select.Option>
            <Select.Option value="EVERY_FEW">Every Few Days</Select.Option>
            <Select.Option value="WEEKLY">Weekly</Select.Option>
          </Select>
        </div>
        <div>
        <label>How often do you composte your waste?</label>
          <Select placeholder="Composting" onChange={setComposting} style={{ width: '100%' }}>
            <Select.Option value="YES">Yes</Select.Option>
            <Select.Option value="NO">No</Select.Option>
            <Select.Option value="PLANNING_TO">Planning To</Select.Option>
          </Select>
        </div>
        <div className="waste-submit">
          <Button type='primary' style={{backgroundColor:'#abde04'}} onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  </motion.div>
  );
};

export default WasteManagement;
