import React, { useState, useEffect } from "react";
import { Modal, Form, Select, InputNumber, Card, Typography, Row, Col,Statistic,Button,Tag,Table,Segmented } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,Legend } from "recharts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import './Sandbox.css'

const { Text } = Typography;

const Sandbox = () => {
    const navigate = useNavigate()
    const [toolTip,setToolTip] = useState(true)

    useEffect(() => {
        !localStorage.getItem('token')&&navigate('/unauthorized')
        const timer = setTimeout(() => setToolTip(false), 10000);
        return () => clearTimeout(timer);
      }, []);
  
  const initialValues = {
    transportation: { daily_commute: "CAR", commute_distance: 10, fuel_type: "PETROL", air_travel: 0 },
    homeEnergy: { energy_source: "GRID", monthly_consumption: 300 },
    foodDiet: { diet_type: "OMNIVORE", food_source: "SOMETIMES" },
    shoppingGoods: { clothing_purchase: "MONTHLY", general_purchases: "WEEKLY", recycling: "ABOUT_HALF" },
    wasteManagement: { waste_disposal: "DAILY", composting: "NO" },
    lifestyleHabits: { energy_saving: "SOMETIMES", water_usage: "SOMETIMES" }
  };

  const [formData, setFormData] = useState(initialValues);
  
  const [emissionData, setEmissionData] = useState({
    total: 0,
    transportation: 0,
    homeEnergy: 0,
    foodDiet: 0,
    shoppingGoods: 0,
    wasteManagement: 0,
    lifestyleHabits: 0
  });

  const [selectedCategory, setSelectedCategory] = useState('Transportation');

  // National Averages for comparison
  const nationalAverages = {
    transportation: 1.5,
    homeEnergy: 1.2,
    foodDiet: 2.5,
    shoppingGoods: 0.3,
    wasteManagement: 0.5,
    lifestyleHabits: 1.0,
    yearly:2876,
    daily:7.9
  };

  // Function to calculate emissions
  const calculateEmissions = (data) => {
    let transportation = 0;
    let homeEnergy = 0;
    let foodDiet = 0;
    let shoppingGoods = 0;
    let wasteManagement = 0;
    let lifestyleHabits = 0;

    // 1. Transportation Emissions
    const { daily_commute, commute_distance, fuel_type, air_travel } = data.transportation;
    const commuteEmissionFactors = {
      CAR: 0.251,
      PUBLIC_TRANSPORT: 0.065,
      CARPOOL: 0.126,
      BICYCLE: 0,
      WALKING: 0
    };
    transportation += commute_distance * commuteEmissionFactors[daily_commute];

    // Air Travel Emissions
    if (air_travel < 1500) {
      transportation += 250 / 365;
    } else if (air_travel <= 4000) {
      transportation += 500 / 365;
    } else {
      transportation += 1000 / 365;
    }

    // 2. Home Energy Usage Emissions
    const { energy_source, monthly_consumption } = data.homeEnergy;
    const energyEmissionFactors = {
      GRID: 0.92,
      SOLAR: 0,
      HYDROELECTRIC: 0,
      NATURAL_GAS: 5.3,
      OTHER: 4
    };
    homeEnergy += (monthly_consumption * energyEmissionFactors[energy_source]) / 30;

    // 3. Food and Diet Emissions
    const { diet_type, food_source } = data.foodDiet;
    const dietEmissionFactors = {
      VEGAN: 2.5,
      VEGETARIAN: 3.5,
      PESCATARIAN: 4.0,
      OMNIVORE: 5.0,
      MEAT_HEAVY: 7.0
    };
    foodDiet += dietEmissionFactors[diet_type];
    const foodSourceAdjustment = {
      ALWAYS: -0.5,
      OFTEN: -0.3,
      SOMETIMES: 0,
      RARELY: 0.3,
      NEVER: 0.5
    };
    foodDiet += foodSourceAdjustment[food_source];

    // 4. Shopping and Goods Emissions
    const { clothing_purchase, general_purchases, recycling } = data.shoppingGoods;
    const shoppingEmissionFactors = {
      WEEKLY: 0.5,
      MONTHLY: 0.2,
      QUARTERLY: 0.1,
      YEARLY: 0.05
    };
    shoppingGoods += shoppingEmissionFactors[clothing_purchase] + shoppingEmissionFactors[general_purchases];
    const recyclingAdjustment = {
      MOST: -0.3,
      ABOUT_HALF: -0.15,
      SOME: 0.15,
      NONE: 0.3
    };
    shoppingGoods += recyclingAdjustment[recycling];

    // 5. Waste Management Emissions
    const { waste_disposal, composting } = data.wasteManagement;
    const wasteEmissionFactors = {
      DAILY: 1.0,
      EVERY_FEW: 0.5,
      WEEKLY: 0.2
    };
    wasteManagement += wasteEmissionFactors[waste_disposal];
    const compostingAdjustment = {
      YES: -0.3,
      PLANNING_TO: -0.15,
      NO: 0
    };
    wasteManagement += compostingAdjustment[composting];

    // 6. Lifestyle and Habits Emissions
    const { energy_saving, water_usage } = data.lifestyleHabits;
    const energySavingFactors = {
      ALWAYS: -1.0,
      OFTEN: -0.5,
      SOMETIMES: 0,
      RARELY: 0.5,
      NEVER: 1.0
    };
    const waterUsageFactors = {
      CONSCIOUS: -0.5,
      SOMETIMES: 0,
      RARELY: 0.5,
      NEVER: 1.0
    };
    lifestyleHabits += energySavingFactors[energy_saving] + waterUsageFactors[water_usage];

    // Total Daily Carbon Footprint
    const total = transportation + homeEnergy + foodDiet + shoppingGoods + wasteManagement + lifestyleHabits;

    return {
      total,
      transportation,
      homeEnergy,
      foodDiet,
      shoppingGoods,
      wasteManagement,
      lifestyleHabits
    };
  };

  // Update emission data whenever formData changes
  useEffect(() => {
    const updatedEmission = calculateEmissions(formData);
    setEmissionData(updatedEmission);
  }, [formData]);

  // Function to handle field changes
  const handleFieldChange = (category, field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [field]: value
      }
    }));
  };

  const chartData = [
    { category: "Transportation", value: emissionData.transportation, average:nationalAverages.transportation },
    { category: "Home Energy", value: emissionData.homeEnergy, average: nationalAverages.homeEnergy},
    { category: "Food and Diet", value: emissionData.foodDiet, average: nationalAverages.foodDiet },
    { category: "Shopping and Goods", value: emissionData.shoppingGoods, average: nationalAverages.shoppingGoods },
    { category: "Waste Management", value: emissionData.wasteManagement, average: nationalAverages.wasteManagement },
    { category: "Lifestyle and Habits", value: emissionData.lifestyleHabits, average: nationalAverages.lifestyleHabits }
  ];


  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Current Emission (kg CO₂)',
      dataIndex: 'emission',
      key: 'emission',
      render: (text) => <Text>{text.toFixed(2)}</Text>,
    },
    {
      title: 'National Average (kg CO₂)',
      key: 'nationalAverage',
      render: (text, record) => <Text>{record.NationalAverage}</Text>, // Use dynamic value here
    },
    {
      title: 'Insight',
      key: 'insight',
      render: (text, record) => {
        const color = record.emission > record.NationalAverage ? 'red' : 'green';
        const insight = record.emission > record.NationalAverage ? 'Needs Improvement' : 'Good';
        return <Tag color={color}>{insight}</Tag>;
      },
    },
  ];
  

  const dataSource = [
    { category: 'Transportation', emission: emissionData.transportation,NationalAverage:nationalAverages.transportation },
    { category: 'Home Energy', emission: emissionData.homeEnergy ,NationalAverage:nationalAverages.homeEnergy},
    { category: 'Food & Diet', emission: emissionData.foodDiet,NationalAverage:nationalAverages.foodDiet},
    { category: 'Shopping & Goods', emission: emissionData.shoppingGoods,NationalAverage:nationalAverages.shoppingGoods},
    { category: 'Waste Management', emission: emissionData.wasteManagement,NationalAverage:nationalAverages.wasteManagement},
    { category: 'Lifestyle & Habits', emission: emissionData.lifestyleHabits,NationalAverage:nationalAverages.lifestyleHabits},
    { category: 'Total', emission: emissionData.total,NationalAverage:nationalAverages.daily},
  ];

  return (
    <div style={{ padding: '20px', paddingLeft: 286,paddingRight:30,display:'flex',flexDirection:'column',gap:'50px'}}>
    
    
    {toolTip && (
        <motion.div
          className="sandbox-tooltip"
          style={{
            width: '100vw',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            textAlign: 'center'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            title="Welcome to the Emission Sandbox"
            style={{
              width: 400,
              padding: '20px',
              backgroundColor: '#fff', 
              color: '#000', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              borderRadius: '10px'
            }}
            bordered={false}
          >
            <p>
              Here you can experiment with various factors that influence your carbon footprint.
              Adjust categories like transportation, energy usage, food habits, and more.
            </p>
            <p>
              Modify the values and see the impact on your emissions in real-time. This tool is designed
              to help you understand the relationship between daily activities and your carbon footprint.
            </p>
            <Button
              type="primary"
              onClick={() => setToolTip(false)}
              style={{ marginTop: '20px', backgroundColor: '#8884d8', borderColor: '#8884d8' }}
            >
              Got it!
            </Button>
          </Card>
        </motion.div>
      )}

    <Card
      title="Total Daily Carbon Footprint"
      bordered
      style={{
        width: '100%',
        marginTop: '20px',
        marginBottom: '25px',
        maxHeight: '90vh',
        overflowY: 'hidden',
      }}
    >
      <Row gutter={[24, 24]} style={{ height: '100%' }}>
        <Col span={12} style={{ height: '100%' }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowKey="category"
            style={{
              marginBottom: '20px',
              height: '88vh'
            }}
          />
        </Col>

        {/* Right Column: Bar Chart for visual comparison */}
        <Col
          span={12}
          style={{
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            height: '100%',
            paddingLeft:'40px'
          }}
        >
        <div style={{ height: '90vh',display:'flex',flexDirection:'column',justifyContent:'space-between',paddingBottom:'110px'}}>
          <div>
            <p style={{ textDecoration: 'underline' }}>Daily Projection</p>
            <ResponsiveContainer width="80%" height={200}>
              <BarChart data={[{ name: 'Total', Emission: emissionData.total, NationalAverage: nationalAverages.daily }]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Emission" fill="#8884d8" />
                <Bar dataKey="NationalAverage" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <p style={{ textDecoration: 'underline' }}>Yearly Projection</p>
            <ResponsiveContainer width="80%" height={200}>
              <BarChart data={[{ name: 'Total', Emission: emissionData.total*365, NationalAverage: nationalAverages.yearly }]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Emission" fill="#8884d8" />
                <Bar dataKey="NationalAverage" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        </Col>
      </Row>
    </Card>
{/*!----------------------------------------------------------------------------------------------------------------------------- */}
        
<Card title="Tweaking Box" bordered hoverable style={{
  height:'60vh'
}}>
  <Segmented
    options={chartData.map((item) => item.category)}
    value={selectedCategory}
    onChange={setSelectedCategory}
  />
  
  {selectedCategory === 'Transportation' && (
    <div className='tweak-cat'>
      <div className="tweak-cat-input">
        <Form.Item label="Daily Commute">
          <Select
            value={formData.transportation.daily_commute}
            onChange={(value) => handleFieldChange('transportation', 'daily_commute', value)}
          >
            <Select.Option value="CAR">Car</Select.Option>
            <Select.Option value="PUBLIC_TRANSPORT">Public Transport</Select.Option>
            <Select.Option value="BICYCLE">Bicycle</Select.Option>
            <Select.Option value="WALKING">Walking</Select.Option>
            <Select.Option value="CARPOOL">Carpool</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Commute Distance (km)">
          <InputNumber
            min={0}
            value={formData.transportation.commute_distance}
            onChange={(value) => handleFieldChange('transportation', 'commute_distance', value)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Fuel Type">
          <Select
            value={formData.transportation.fuel_type}
            onChange={(value) => handleFieldChange('transportation', 'fuel_type', value)}
          >
            <Select.Option value="PETROL">Petrol</Select.Option>
            <Select.Option value="DIESEL">Diesel</Select.Option>
            <Select.Option value="ELECTRIC">Electric</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Air Travel (km per year)">
          <InputNumber
            min={0}
            value={formData.transportation.air_travel}
            onChange={(value) => handleFieldChange('transportation', 'air_travel', value)}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </div>

      <div className='tweak-cat-chart'>
            <p style={{ textDecoration: 'underline' }}>Daily Projection</p>
            <ResponsiveContainer width="80%" height={200}>
              <BarChart data={[{ name: 'Total', Emission: emissionData.transportation, NationalAverage: nationalAverages.transportation }]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Emission" fill="#8884d8" />
                <Bar dataKey="NationalAverage" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
    </div>
  )}

  {selectedCategory === 'Home Energy' && (
    <div className='tweak-cat'>
      <div className="tweak-cat-input">
        <Form.Item label="Energy Source">
          <Select
            value={formData.homeEnergy.energy_source}
            onChange={(value) => handleFieldChange('homeEnergy', 'energy_source', value)}
          >
            <Select.Option value="GRID">Grid</Select.Option>
            <Select.Option value="SOLAR">Solar</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Monthly Consumption (kWh)">
          <InputNumber
            min={0}
            value={formData.homeEnergy.monthly_consumption}
            onChange={(value) => handleFieldChange('homeEnergy', 'monthly_consumption', value)}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </div>
      <div className="tweak-cat-chart">
          <p style={{ textDecoration: 'underline' }}>Daily Projection</p>
          <ResponsiveContainer width="80%" height={200}>
            <BarChart data={[{ name: 'Total', Emission: emissionData.homeEnergy, NationalAverage: nationalAverages.homeEnergy }]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Emission" fill="#8884d8" />
              <Bar dataKey="NationalAverage" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  )}

  {selectedCategory === 'Food and Diet' && (
    <div className="tweak-cat">
      <div className="tweak-cat-input">
        <Form.Item label="Diet Type">
          <Select
            value={formData.foodDiet.diet_type}
            onChange={(value) => handleFieldChange('foodDiet', 'diet_type', value)}
          >
            <Select.Option value="VEGAN">Vegan</Select.Option>
            <Select.Option value="VEGETARIAN">Vegetarian</Select.Option>
            <Select.Option value="OMNIVORE">Omnivore</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Food Source">
          <Select
            value={formData.foodDiet.food_source}
            onChange={(value) => handleFieldChange('foodDiet', 'food_source', value)}
          >
            <Select.Option value="ALWAYS">Always local</Select.Option>
            <Select.Option value="OCCASIONALLY">Occasionally local</Select.Option>
            <Select.Option value="NEVER">Never local</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div className="tweak-cat-chart">
          <p style={{ textDecoration: 'underline' }}>Daily Projection</p>
          <ResponsiveContainer width="80%" height={200}>
            <BarChart data={[{ name: 'Total', Emission: emissionData.foodDiet, NationalAverage: nationalAverages.foodDiet }]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Emission" fill="#8884d8" />
              <Bar dataKey="NationalAverage" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  )}

  {selectedCategory === 'Shopping and Goods' && (
    <div className='tweak-cat'>
      <div className="tweak-cat-input">
        <Form.Item label="Clothing Purchase Frequency">
          <Select
            value={formData.shoppingGoods.clothing_purchase}
            onChange={(value) => handleFieldChange('shoppingGoods', 'clothing_purchase', value)}
          >
            <Select.Option value="MONTHLY">Monthly</Select.Option>
            <Select.Option value="QUARTERLY">Quarterly</Select.Option>
            <Select.Option value="ANNUALLY">Annually</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="General Purchases Frequency">
          <Select
            value={formData.shoppingGoods.general_purchases}
            onChange={(value) => handleFieldChange('shoppingGoods', 'general_purchases', value)}
          >
            <Select.Option value="MONTHLY">Monthly</Select.Option>
            <Select.Option value="QUARTERLY">Quarterly</Select.Option>
            <Select.Option value="ANNUALLY">Annually</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Recycling Frequency">
          <Select
            value={formData.shoppingGoods.recycling}
            onChange={(value) => handleFieldChange('shoppingGoods', 'recycling', value)}
          >
            <Select.Option value="MOST">Most of the time</Select.Option>
            <Select.Option value="SOMETIMES">Sometimes</Select.Option>
            <Select.Option value="NEVER">Never</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div className="tweak-cat-chart">
          <p style={{ textDecoration: 'underline' }}>Daily Projection</p>
          <ResponsiveContainer width="80%" height={200}>
            <BarChart data={[{ name: 'Total', Emission: emissionData.shoppingGoods, NationalAverage: nationalAverages.shoppingGoods }]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Emission" fill="#8884d8" />
              <Bar dataKey="NationalAverage" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  )}

  {selectedCategory === 'Waste Management' && (
    <div className='tweak-cat'>
      <div className="tweak-cat-input">
        <Form.Item label="Waste Disposal Frequency">
          <Select
            value={formData.wasteManagement.waste_disposal}
            onChange={(value) => handleFieldChange('wasteManagement', 'waste_disposal', value)}
          >
            <Select.Option value="DAILY">Daily</Select.Option>
            <Select.Option value="WEEKLY">Weekly</Select.Option>
            <Select.Option value="MONTHLY">Monthly</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Composting">
          <Select
            value={formData.wasteManagement.composting}
            onChange={(value) => handleFieldChange('wasteManagement', 'composting', value)}
          >
            <Select.Option value="YES">Yes</Select.Option>
            <Select.Option value="NO">No</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div className="tweak-cat-chart">
          <p style={{ textDecoration: 'underline' }}>Daily Projection</p>
          <ResponsiveContainer width="80%" height={200}>
            <BarChart data={[{ name: 'Total', Emission: emissionData.wasteManagement, NationalAverage: nationalAverages.wasteManagement }]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Emission" fill="#8884d8" />
              <Bar dataKey="NationalAverage" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  )}

  {selectedCategory === 'Lifestyle and Habits' && (
    <div className='tweak-cat'>
      <div className="tweak-cat-input">
        <Form.Item label="Energy Saving Habits">
          <Select
            value={formData.lifestyleHabits.energy_saving}
            onChange={(value) => handleFieldChange('lifestyleHabits', 'energy_saving', value)}
          >
            <Select.Option value="ALWAYS">Always</Select.Option>
            <Select.Option value="OCCASIONALLY">Occasionally</Select.Option>
            <Select.Option value="NEVER">Never</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Water Usage">
          <Select
            value={formData.lifestyleHabits.water_usage}
            onChange={(value) => handleFieldChange('lifestyleHabits', 'water_usage', value)}
          >
            <Select.Option value="CONSCIOUS">Conscious</Select.Option>
            <Select.Option value="AVERAGE">Average</Select.Option>
            <Select.Option value="WASTEFUL">Wasteful</Select.Option>
          </Select>
        </Form.Item>
      </div>
      
      <div className="tweak-cat-chart">
          <p style={{ textDecoration: 'underline' }}>Daily Projection</p>
          <ResponsiveContainer width="80%" height={200}>
            <BarChart data={[{ name: 'Total', Emission: emissionData.lifestyleHabits, NationalAverage: nationalAverages.lifestyleHabits }]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Emission" fill="#8884d8" />
              <Bar dataKey="NationalAverage" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  )}
</Card>


    </div>
  );
};

export default Sandbox;
