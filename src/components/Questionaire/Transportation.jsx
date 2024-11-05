import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Select, InputNumber, Button } from 'antd';
import { motion } from 'framer-motion';
import './Styles/Transportation.css'

const { Option } = Select;

const Transportation = ({submit}) => {
  const [dailyCommute, setDailyCommute] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [commuteDistance, setCommuteDistance] = useState(0);
  const [airTravel, setAirTravel] = useState(0);

  const handleSubmit = () => {
    console.log("Transportation Posted");
    submit({ dailyCommute, fuelType, commuteDistance, airTravel })
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
            <img src="https://firebasestorage.googleapis.com/v0/b/django-tut-16ef3.appspot.com/o/carbontrack_assets%2Ficon_assets%2Ftransportation.png?alt=media&token=da87ef18-f15d-4635-b43c-f79dfbc3ca6a" alt="" />
          </div>
          <form className='t-form'>
              
                <div className="daily-commute">
                  <label>What vehicle do you use for your daily commute?</label>
                  <Select
                    style={{ width: '100%' }}
                    value={dailyCommute}
                    onChange={(value) => setDailyCommute(value)}
                    placeholder="Select Commute Type"
                  >
                    <Option value="CAR">Car</Option>
                    <Option value="PUBLIC_TRANSPORT">Public Transport</Option>
                    <Option value="BICYCLE">Bicycle</Option>
                    <Option value="WALKING">Walking</Option>
                    <Option value="CARPOOL">Carpool</Option>
                  </Select>
                </div>

              {(["CAR","CARPOOL","PUBLIC_TRANSPORT"].indexOf(dailyCommute) > -1)&&

                <div className="fuel-type">
                  <label>What fuel does your vehicle use?</label>
                  <Select
                    style={{ width: '100%' }}
                    value={fuelType}
                    onChange={(value) => setFuelType(value)}
                    placeholder="Select Fuel Type"
                    allowClear
                  >
                    <Option value="PETROL">Petrol</Option>
                    <Option value="DIESEL">Diesel</Option>
                    <Option value="ELECTRIC">Electric</Option>
                  </Select>
                </div>}


                <div className="commute-distance">
                  <label>How much distance do you travel in a day?</label>
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    value={commuteDistance}
                    onChange={(value) => setCommuteDistance(value)}
                    placeholder="Distance in kilometers"
                  />
                </div>

                <div className="air-travel">
                  <label>On an average what air travel distance do you clock in a year?</label>
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    value={airTravel}
                    onChange={(value) => setAirTravel(value)}
                    placeholder="Distance in kilometers"
                  />
                </div>


                <div className="transport-submit">
                    <Button type='primary' onClick={handleSubmit} className='primary' style={{backgroundColor:'#abde04'}}>Submit</Button> 
                </div>
          </form>

        </div>
    </motion.div>
  );
};

export default Transportation;
