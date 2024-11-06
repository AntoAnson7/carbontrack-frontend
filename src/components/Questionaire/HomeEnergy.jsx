import React, { useState } from 'react';
import { Select, InputNumber, Button } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios'
import {message} from 'antd'
import { useSelector } from 'react-redux';

const HomeEnergy = ({submit}) => {
  const user = useSelector((state)=>state.user.user)

  const [livingSituation, setLivingSituation] = useState('');
  const [householdSize, setHouseholdSize] = useState(1);
  const [energySource, setEnergySource] = useState('');
  const [monthlyConsumption, setMonthlyConsumption] = useState(0);

  const handleSubmit = async() => {
    const data={
      "living_situation":livingSituation,
      "household_size":householdSize,
      "energy_source":energySource,
      "monthly_consumption":monthlyConsumption,
      "username":user.username
    }

    try{
      const res = await axios.post('http://127.0.0.1:8000/api/energy/',data)
      message.success('Energy Usage details received!')
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
    <div className="questionaire">
      <div className="t-top">
        <img src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2Fenergy.png?alt=media&token=b35a6952-42b5-4745-ad0d-d00aeddef039" alt="" style={{width:'500px'}}/>
      </div>
      <form className="t-form">
        <div className="monthly-consumption">
        <label>What is your current monthly energy consumption? (in kWh)</label>
          <InputNumber min={0} value={monthlyConsumption} onChange={setMonthlyConsumption} placeholder="Monthly Consumption (kWh)" />
        </div>

        <div className="living-situation">
          <label>What is your current living situation?</label>
          <Select placeholder="Select Living Situation" onChange={setLivingSituation} style={{ width: '100%' }}>
            <Select.Option value="APARTMENT">Apartment</Select.Option>
            <Select.Option value="DETATCHED_HOUSE">Detached House</Select.Option>
            <Select.Option value="SHARED_HOUSING">Shared Housing</Select.Option>
          </Select>
        </div>

        <div className="household-size">
        <label>How many members are living in your home?</label>
          <InputNumber min={1} value={householdSize} onChange={setHouseholdSize} placeholder="Household Size" />
        </div>

        <div className="energy-source">
        <label>What is your main source of energy?</label>
          <Select placeholder="Select Energy Source" onChange={setEnergySource} style={{ width: '100%' }}>
            <Select.Option value="GRID">Grid</Select.Option>
            <Select.Option value="SOLAR">Solar</Select.Option>
            <Select.Option value="NATURAL_GAS">Natural Gas</Select.Option>
            <Select.Option value="OTHER">Other</Select.Option>
            <Select.Option value="HYDROELECTRIC">Hydroelectric</Select.Option>
          </Select>
        </div>

        <div className="energy-submit">
          <Button type='primary' style={{backgroundColor:'#abde04'}} onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </div>

  </motion.div>
  );
};

export default HomeEnergy;
