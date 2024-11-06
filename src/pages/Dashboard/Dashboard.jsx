import React, { useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Card, Row, Col } from 'antd';
import { motion } from 'framer-motion';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router';
import NoDataTakeSurvey from '../../components/Errors/NoDataTakeSurvey'

Chart.register(CategoryScale);

const Dashboard = () => {
    const navigate = useNavigate()
    const user = useSelector((state)=>state.user.user)
    const isLoggedIn = useSelector((state)=>state.user.isLoggedIn)
    const profile = useSelector((state) => state.profile);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isLoggedIn) {
                navigate('/unauthorized');
            }
        }, 200);
        return () => clearTimeout(timer); 
    }, [isLoggedIn, navigate,profile]);

    // Hardcoded user data
    const userData = {
        daily_carbon_footprint: 9.52786301369863,
        yearly_carbon_footprint: 3477.67,
        transportation_emissions: 3.3778630136986303,
        home_energy_emissions: 0.0,
        food_emissions: 5.3,
        shopping_emissions: 0.15,
        waste_emissions: 0.7,
        lifestyle_emissions: 0.0,
    };

    // Approximate national averages for India
    const nationalAverages = {
        daily: 7.0,
        yearly: 2565,
        transportation: 1.5,
        home_energy: 1.2,
        food: 2.5,
        shopping: 0.3,
        waste: 0.5,
        lifestyle: 1.0
    };

    const categories = [
        { name: "Transportation", userEmission: userData.transportation_emissions, avgEmission: nationalAverages.transportation },
        { name: "Home Energy", userEmission: userData.home_energy_emissions, avgEmission: nationalAverages.home_energy },
        { name: "Food", userEmission: userData.food_emissions, avgEmission: nationalAverages.food },
        { name: "Shopping", userEmission: userData.shopping_emissions, avgEmission: nationalAverages.shopping },
        { name: "Waste", userEmission: userData.waste_emissions, avgEmission: nationalAverages.waste },
        { name: "Lifestyle", userEmission: userData.lifestyle_emissions, avgEmission: nationalAverages.lifestyle }
    ];

    return (
        <div className="dashboard" style={{ padding: '20px' }}>
            {profile.available?<div className="data-available">
                <h2 className="dashboard-title" style={{ color: '#abde04', textAlign: 'center', marginBottom: '20px' }}>Carbon Footprint Dashboard</h2>
                
                {/* Summary Section */}
                <Row gutter={[16, 16]} className="summary-section">
                    <Col span={12}>
                        <Card className="summary-card" style={{ backgroundColor: '#f9fafb', boxShadow: '3px 3px 10px lightgrey' }}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <h3 style={{ color: '#333' }}>Daily Carbon Footprint</h3>
                                <p>{userData.daily_carbon_footprint.toFixed(2)} kg</p>
                                <p style={{ color: '#abde04' }}>National Avg: {nationalAverages.daily} kg</p>
                            </motion.div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className="summary-card" style={{ backgroundColor: '#f9fafb', boxShadow: '3px 3px 10px lightgrey' }}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <h3 style={{ color: '#333' }}>Yearly Carbon Footprint</h3>
                                <p>{userData.yearly_carbon_footprint.toFixed(2)} kg</p>
                                <p style={{ color: '#abde04' }}>National Avg: {nationalAverages.yearly} kg</p>
                            </motion.div>
                        </Card>
                    </Col>
                </Row>
                {/* Emissions by Category */}
                <div className="emissions-category" style={{ marginTop: '40px' }}>
                    <h3 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Emissions Breakdown</h3>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Bar
                            data={{
                                labels: categories.map(cat => cat.name),
                                datasets: [
                                    { label: 'User Emissions (kg)', data: categories.map(cat => cat.userEmission), backgroundColor: '#abde04' },
                                    { label: 'National Avg (kg)', data: categories.map(cat => cat.avgEmission), backgroundColor: '#e0e0e0' }
                                ]
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: true, position: 'top' }
                                }
                            }}
                        />
                    </motion.div>
                </div>
                {/* Historical Trends */}
                <div className="historical-trends" style={{ marginTop: '40px' }}>
                    <h3 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Emission Trends</h3>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Line
                            data={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],  // Replace with actual time periods
                                datasets: [{
                                    label: 'Daily Carbon Footprint',
                                    data: [8.5, 9.2, 9.0, 9.4, 9.3, 9.5], // Example data
                                    backgroundColor: '#abde04',
                                    borderColor: '#abde04'
                                }]
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: true, position: 'top' }
                                }
                            }}
                        />
                    </motion.div>
                </div>
                {/* Recommendations */}
                <div className="recommendations" style={{ marginTop: '40px', textAlign: 'center' }}>
                    <h3 style={{ color: '#333' }}>Recommendations</h3>
                    <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        {categories
                            .filter(cat => cat.userEmission > cat.avgEmission)
                            .map((cat, index) => (
                                <li key={index} style={{ color: '#666' }}>
                                    Consider reducing your {cat.name.toLowerCase()} emissions by exploring sustainable alternatives.
                                </li>
                        ))}
                    </motion.ul>
                </div>
            </div>:(
                <NoDataTakeSurvey/>
            )}
        </div>
    );
};

export default Dashboard;
