import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import NoDataTakeSurvey from '../../components/Errors/NoDataTakeSurvey';
import { Spin } from 'antd';
import './Dashboard.css'
import axios from 'axios';
import DashPG1 from './DashPG1'
import ChatBot from '../../components/ChatBot/ChatBot'

const { Text } = Typography;

const Dashboard = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const profile = useSelector((state) => state.profile.profile);
    const profileAvailable = useSelector((state) => state.profile.available);
    const [enrolledIn,setEnrolledIn] = useState([])
    const [loading,setLoading] = useState(true)
    const [giftCards,setGiftcards]=useState([])

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/unauthorized');
        }
        localStorage.getItem('claimed_rewards')&&setGiftcards(JSON.parse(localStorage.getItem('claimed_rewards')))

        const fetchProjects=async()=>{
            try{
                const res = await axios.get("http://127.0.0.1:8000/api/enroll/",{ headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},});
                setEnrolledIn(res.data.projects)
                console.log(enrolledIn)
            }
            catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }

        }

        localStorage.getItem('token')&&fetchProjects()
    }, [isLoggedIn, navigate]);

    const nationalAverages = {
        daily: 7.9,
        yearly: 2565,
        transportation: 1.5,
        home_energy: 1.2,
        food: 2.5,
        shopping: 0.3,
        waste: 0.5,
        lifestyle: 1.0
    };

    const data = [
        { category: 'Daily', value: profile&&profile.daily_carbon_footprint || 0, average: nationalAverages.daily },
        { category: 'Yearly', value: profile&&profile.yearly_carbon_footprint || 0, average: nationalAverages.yearly },
        { category: 'Transportation', value: profile&&profile.transportation_emissions || 0, average: nationalAverages.transportation },
        { category: 'Home Energy', value: profile&&profile.home_energy_emissions || 0, average: nationalAverages.home_energy },
        { category: 'Food', value: profile&&profile.food_emissions || 0, average: nationalAverages.food },
        { category: 'Shopping', value: profile&&profile.shopping_emissions || 0, average: nationalAverages.shopping },
        { category: 'Waste', value: profile&&profile.waste_emissions || 0, average: nationalAverages.waste },
        { category: 'Lifestyle', value: profile&&profile.lifestyle_emissions || 0, average: nationalAverages.lifestyle }
    ];

    const getComparisonText = (value, average) => {
        if (value < average) return 'Below national average. Great job! Keeup Up the good work and contribute to the nature!';
        return 'Above national average. Consider taking steps to reduce emissions.';
    };
    if (loading) {
        return <Spin tip="Loading..." />;
      }

    return (
        <div className="dashboard" style={{ padding: '20px', paddingLeft: 286,paddingRight:30 }}>
            {profileAvailable ? (
                <div className="profile-available">
                    <div className="dash-header" style={{marginLeft:'15px'}}>
                        <h1 style={{ color: '#ABDE04' }}>Dashboard</h1>
                        <hr style={{opacity:'10%'}}/>
                    </div>

                    <DashPG1 enrolledIn={enrolledIn} giftCards={giftCards} data={data} getComparisonText={getComparisonText}/>
                    <div style={{width:'100%'}}>
                        <ChatBot/>
                    </div>
                </div>
            ) : (
                <NoDataTakeSurvey />
            )}
        </div>
    );
};

export default Dashboard;









{/* <Row gutter={[16, 16]}>
    {data.slice(2).map((item, index) => (
        <Col span={12} key={index}>
            <h1 style={{fontSize:'30px',color:'#abde04'}}>{item.category} Emmissions</h1>
            <hr />
            <Card title={`${item.category} Emissions`} bordered>
                <Statistic
                    title="Emissions (kg CO₂)"
                    value={item.value}
                    precision={2}
                />
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[{ name: item.category, user: item.value, average: item.average }]}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="user" fill="#8884d8" name="Your Emissions" />
                        <Bar dataKey="average" fill="#82ca9d" name="National Average" />
                    </BarChart>
                </ResponsiveContainer>
                <Text type={item.value < item.average ? 'success' : 'warning'}>
                    {getComparisonText(item.value, item.average)}
                </Text>
            </Card>
        </Col>
    ))}
</Row> */}












