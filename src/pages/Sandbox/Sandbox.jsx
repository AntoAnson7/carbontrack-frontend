import React, { useState, useEffect } from "react";
import { Modal, Form, Select, InputNumber, Card, Typography, Row, Col,Statistic,Button } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,Legend } from "recharts";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const { Text } = Typography;

const Sandbox = () => {
    const navigate = useNavigate()
    const [toolTip,setToolTip] = useState(true)
    const profile = useSelector((state)=>state.profile.profile)
    const profileAvailable = useSelector((state)=>state.profile.available)

    useEffect(() => {
        !profileAvailable&&navigate('/unauthorized')
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

  // State for form data
  const [formData, setFormData] = useState(initialValues);
  
  // State for emission data
  const [emissionData, setEmissionData] = useState({
    total: 0,
    transportation: 0,
    homeEnergy: 0,
    foodDiet: 0,
    shoppingGoods: 0,
    wasteManagement: 0,
    lifestyleHabits: 0
  });

  // State for Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // National Averages for comparison
  const nationalAverages = {
    transportation: 1.5,
    homeEnergy: 1.2,
    foodDiet: 2.5,
    shoppingGoods: 0.3,
    wasteManagement: 0.5,
    lifestyleHabits: 1.0
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

  // Function to open modal for a specific category
  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCategory(null);
  };

  // Prepare data for visualization
  const chartData = [
    { category: "Transportation", value: emissionData.transportation, average: nationalAverages.transportation },
    { category: "Home Energy", value: emissionData.homeEnergy, average: nationalAverages.homeEnergy },
    { category: "Food and Diet", value: emissionData.foodDiet, average: nationalAverages.foodDiet },
    { category: "Shopping and Goods", value: emissionData.shoppingGoods, average: nationalAverages.shoppingGoods },
    { category: "Waste Management", value: emissionData.wasteManagement, average: nationalAverages.wasteManagement },
    { category: "Lifestyle and Habits", value: emissionData.lifestyleHabits, average: nationalAverages.lifestyleHabits }
  ];

  // Function to get comparison message
  const getComparisonMessage = (value, average) => {
    if (value < average) {
      return <Text type="success">Great job! You're below the national average.</Text>;
    } else {
      let suggestion = '';
      switch (selectedCategory.toLowerCase()) {
        case 'transportation':
          suggestion = 'Consider carpooling, using public transport, or cycling.';
          break;
        case 'home energy':
          suggestion = 'Use energy-efficient appliances or reduce heating/cooling usage.';
          break;
        case 'food and diet':
          suggestion = 'Reduce meat intake or opt for locally-sourced food.';
          break;
        case 'shopping and goods':
          suggestion = 'Reduce unnecessary purchases and choose sustainable brands.';
          break;
        case 'waste management':
          suggestion = 'Recycle more, compost organic waste, and avoid single-use plastics.';
          break;
        case 'lifestyle and habits':
          suggestion = 'Engage in sustainable habits like energy-saving and mindful consumption.';
          break;
        default:
          suggestion = '';
      }
      return <Text type="warning">Above national average. {suggestion}</Text>;
    }
  };

  return (
    <div style={{ padding: '20px', paddingLeft: 260 }}>
    
    
    {toolTip && (
        <motion.div
          className="sandbox-tooltip"
          style={{
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: '0',
            left: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)', // Adding blur effect to the background
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
              backgroundColor: '#fff', // White background for the card
              color: '#000', // Black text for the card
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
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


      <Card title="Total Daily Carbon Footprint" bordered style={{ marginTop: '20px',marginBottom:'25px',height:'300px' }}>
        <Statistic
          value={emissionData.total.toFixed(2)}
          precision={2}
          suffix="kg CO₂"
        />
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={[{ name: 'Total', Emission: emissionData.total, NationalAverage: 7.0 }]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Emission" fill="#8884d8" />
            <Bar dataKey="NationalAverage" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <Text>{emissionData.total < 7.0 ? <p style={{color:'green'}}>Below National Average &#128513;&#128293;</p> : <p style={{color:'red'}}>Above National Average &#128532;♨️;
      </p>}</Text>
      </Card>


      <Row gutter={[16, 16]}>
        {chartData.map((item) => (
          <Col xs={24} sm={12} md={8} lg={8} key={item.category}>
            <Card
              title={item.category}
              bordered
              hoverable
              onClick={() => openModal(item.category)}
              style={{ cursor: 'pointer' }}
            >
              <Statistic
                value={item.value.toFixed(2)}
                precision={2}
                suffix="kg CO₂"
              />
              <ResponsiveContainer width="100%" height={100}>
                <BarChart
                  data={[
                    { name: item.category, Emission: item.value, NationalAverage: item.average }
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="Emission" fill="#8884d8" />
                  <Bar dataKey="NationalAverage" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
              <Text>{item.value < item.average ? <p style={{color:'green'}}>Below National Average &#128513;&#128293;</p> : 
        <p style={{color:'red'}}>
          Above National Average &#128532;♨️;
        </p>}
            </Text>
          </Card>
        </Col>
        ))}
      </Row>

      {/* Modal for Emission Tweak */}
      <Modal
        title={`Adjust ${selectedCategory}`}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedCategory && (
          <Form layout="vertical">
            {/* Transportation Form */}
            {selectedCategory === "Transportation" && (
              <>
                <Form.Item label="Daily Commute">
                  <Select
                    value={formData.transportation.daily_commute}
                    onChange={(value) => handleFieldChange("transportation", "daily_commute", value)}
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
                    onChange={(value) => handleFieldChange("transportation", "commute_distance", value)}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item label="Fuel Type">
                  <Select
                    value={formData.transportation.fuel_type}
                    onChange={(value) => handleFieldChange("transportation", "fuel_type", value)}
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
                    onChange={(value) => handleFieldChange("transportation", "air_travel", value)}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </>
            )}

            {/* Home Energy Form */}
            {selectedCategory === "Home Energy" && (
              <>
                <Form.Item label="Energy Source">
                  <Select
                    value={formData.homeEnergy.energy_source}
                    onChange={(value) => handleFieldChange("homeEnergy", "energy_source", value)}
                  >
                    <Select.Option value="GRID">Grid</Select.Option>
                    <Select.Option value="SOLAR">Solar</Select.Option>
                    <Select.Option value="NATURAL_GAS">Natural Gas</Select.Option>
                    <Select.Option value="OTHER">Other</Select.Option>
                    <Select.Option value="HYDROELECTRIC">Hydroelectric</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Monthly Consumption (kWh)">
                  <InputNumber
                    min={0}
                    value={formData.homeEnergy.monthly_consumption}
                    onChange={(value) => handleFieldChange("homeEnergy", "monthly_consumption", value)}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </>
            )}

            {/* Food and Diet Form */}
            {selectedCategory === "Food and Diet" && (
              <>
                <Form.Item label="Diet Type">
                  <Select
                    value={formData.foodDiet.diet_type}
                    onChange={(value) => handleFieldChange("foodDiet", "diet_type", value)}
                  >
                    <Select.Option value="VEGAN">Vegan</Select.Option>
                    <Select.Option value="VEGETARIAN">Vegetarian</Select.Option>
                    <Select.Option value="PESCATARIAN">Pescatarian</Select.Option>
                    <Select.Option value="OMNIVORE">Omnivore</Select.Option>
                    <Select.Option value="MEAT_HEAVY">Meat-Heavy</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Food Source">
                  <Select
                    value={formData.foodDiet.food_source}
                    onChange={(value) => handleFieldChange("foodDiet", "food_source", value)}
                  >
                    <Select.Option value="ALWAYS">Always</Select.Option>
                    <Select.Option value="OFTEN">Often</Select.Option>
                    <Select.Option value="SOMETIMES">Sometimes</Select.Option>
                    <Select.Option value="RARELY">Rarely</Select.Option>
                    <Select.Option value="NEVER">Never</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}

            {/* Shopping and Goods Form */}
            {selectedCategory === "Shopping and Goods" && (
              <>
                <Form.Item label="Clothing Purchase Frequency">
                  <Select
                    value={formData.shoppingGoods.clothing_purchase}
                    onChange={(value) => handleFieldChange("shoppingGoods", "clothing_purchase", value)}
                  >
                    <Select.Option value="WEEKLY">Weekly</Select.Option>
                    <Select.Option value="MONTHLY">Monthly</Select.Option>
                    <Select.Option value="QUARTERLY">Quarterly</Select.Option>
                    <Select.Option value="YEARLY">Yearly</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="General Purchases Frequency">
                  <Select
                    value={formData.shoppingGoods.general_purchases}
                    onChange={(value) => handleFieldChange("shoppingGoods", "general_purchases", value)}
                  >
                    <Select.Option value="WEEKLY">Weekly</Select.Option>
                    <Select.Option value="MONTHLY">Monthly</Select.Option>
                    <Select.Option value="QUARTERLY">Quarterly</Select.Option>
                    <Select.Option value="YEARLY">Yearly</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Recycling Habits">
                  <Select
                    value={formData.shoppingGoods.recycling}
                    onChange={(value) => handleFieldChange("shoppingGoods", "recycling", value)}
                  >
                    <Select.Option value="MOST">Most</Select.Option>
                    <Select.Option value="ABOUT_HALF">About Half</Select.Option>
                    <Select.Option value="SOME">Some</Select.Option>
                    <Select.Option value="NONE">None</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}

            {/* Waste Management Form */}
            {selectedCategory === "Waste Management" && (
              <>
                <Form.Item label="Waste Disposal Frequency">
                  <Select
                    value={formData.wasteManagement.waste_disposal}
                    onChange={(value) => handleFieldChange("wasteManagement", "waste_disposal", value)}
                  >
                    <Select.Option value="DAILY">Daily</Select.Option>
                    <Select.Option value="EVERY_FEW">Every Few Days</Select.Option>
                    <Select.Option value="WEEKLY">Weekly</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Composting">
                  <Select
                    value={formData.wasteManagement.composting}
                    onChange={(value) => handleFieldChange("wasteManagement", "composting", value)}
                  >
                    <Select.Option value="YES">Yes</Select.Option>
                    <Select.Option value="NO">No</Select.Option>
                    <Select.Option value="PLANNING_TO">Planning To</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}

            {/* Lifestyle and Habits Form */}
            {selectedCategory === "Lifestyle and Habits" && (
              <>
                <Form.Item label="Energy Saving Habits">
                  <Select
                    value={formData.lifestyleHabits.energy_saving}
                    onChange={(value) => handleFieldChange("lifestyleHabits", "energy_saving", value)}
                  >
                    <Select.Option value="ALWAYS">Always</Select.Option>
                    <Select.Option value="OFTEN">Often</Select.Option>
                    <Select.Option value="SOMETIMES">Sometimes</Select.Option>
                    <Select.Option value="RARELY">Rarely</Select.Option>
                    <Select.Option value="NEVER">Never</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Water Usage Habits">
                  <Select
                    value={formData.lifestyleHabits.water_usage}
                    onChange={(value) => handleFieldChange("lifestyleHabits", "water_usage", value)}
                  >
                    <Select.Option value="CONSCIOUS">Conscious</Select.Option>
                    <Select.Option value="SOMETIMES">Sometimes</Select.Option>
                    <Select.Option value="RARELY">Rarely</Select.Option>
                    <Select.Option value="NEVER">Never</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}
          </Form>
        )}
        {/* Comparison Message */}
        {selectedCategory && (
          <div style={{ marginTop: '20px' }}>
            <Text strong>
              {emissionData[selectedCategory.replace(/\s/g, '')] < nationalAverages[selectedCategory.replace(/\s/g, '').toLowerCase()]
                ? "Great job! You're below the national average."
                : "Above national average. Consider taking steps to reduce emissions."}
            </Text>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Sandbox;
