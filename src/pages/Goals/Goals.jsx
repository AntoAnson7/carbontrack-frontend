import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, InputNumber, Typography, message } from 'antd';
import { useNavigate } from 'react-router';
import NotificationManager from '../../components/Notification/NotificationManager';
import { useSelector } from 'react-redux';
import NoDataTakeSurvey from '../../components/Errors/NoDataTakeSurvey'

const { Text } = Typography;

const Goals = () => {
    const navigate = useNavigate();
    const [goal, setGoal] = useState(1);
    const [activeGoals, setActiveGoals] = useState([]);
    const profile = useSelector((state)=>state.profile.profile)
    const profileAvailable = useSelector((state)=>state.profile.available)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/unauthorized');
        } else {
            fetchGoals();
        }
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/goals/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setActiveGoals(response.data);
        } catch (error) {
            console.error('Error fetching goals:', error);
            message.error('Failed to load goals');
        }
    };

    const saveGoal = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/goals/', { daily_goal: goal }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setActiveGoals([...activeGoals, response.data]);
            setGoal(0);
            message.success('Goal saved successfully!');
        } catch (error) {
            console.error('Error saving goal:', error);
            message.error('Failed to save goal');
        }
    };

    const deleteGoal = async (goalId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/goals/${goalId}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            
            const updatedGoals = activeGoals.filter(goal => goal.id !== goalId);
            setActiveGoals(updatedGoals);
    
            if (updatedGoals.length === 0) {
                setActiveGoals([]);
            }
    
            message.success('Goal deleted successfully!');
        } catch (error) {
            console.error('Error deleting goal:', error);
            message.error('Failed to delete goal');
        }
    };
    

    return (
        <div className="goals-page" style={{ padding: '20px', paddingLeft: 296,paddingRight:40, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {profileAvailable==true?<div className="profile-true" style={{display:'flex',flexDirection:'column',gap:'30px'}}>
                <h1 style={{ color: '#ABDE04' }}>Set Your Daily Footprint Goals</h1>
                <hr style={{ opacity: '10%' }} />
                <NotificationManager activeGoal={activeGoals[0]} />

                <Card title="Carbon Footprint Comparison" bordered style={{boxShadow:'3px 3px 10px rgba(0,0,0,0.1)'}}>
                    <Text>Your current daily carbon footprint: </Text>
                    <Text style={{ color: 'green', fontSize: '18px' }}>
                        {profile.daily_carbon_footprint.toFixed(2)} kg CO₂
                    </Text>
                    <br />
                    <Text>National average daily carbon footprint: </Text>
                    <Text style={{ color: 'orange', fontSize: '18px' }}>
                        {7.9} kg CO₂
                    </Text>
                    <br />
                    <Text>
                        {profile.daily_carbon_footprint > 7.9
                            ? 'You are above the national average. Consider setting a goal to reduce your carbon footprint.'
                            : 'You are below the national average. Keep up the good work!'}
                    </Text>
                </Card>

                <Card title="Set Your Daily Carbon Footprint Goal" bordered style={{opacity:activeGoals.length>0?'50%':'100%',boxShadow:'3px 3px 10px rgba(0,0,0,0.1)'}} >
                    <Text>Set your daily goal (kg CO₂):</Text>
                    <InputNumber
                        min={1}
                        value={goal}
                        onChange={setGoal}
                        style={{ width: '100%', marginTop: '10px' }}
                    />
                    <Button
                        type="primary"
                        onClick={saveGoal}
                        style={{ marginTop: '20px', backgroundColor: '#abde04', borderColor: '#abde04',width:'150px' }}
                        disabled={activeGoals.length>0?true:false}
                    >
                        Save Goal
                    </Button>
                </Card>

                {activeGoals.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <h2>Active Goals</h2>
                        {activeGoals.map((goal) => (
                            <Card
                                key={goal.id}
                                title="Active Daily Goal"
                                bordered
                                style={{ marginBottom: '10px',boxShadow:'3px 3px 10px rgba(0,0,0,0.1)' }}
                            >
                                <Text>Your daily carbon footprint goal is:</Text>
                                <Text style={{ color: 'green', fontSize: '18px', fontWeight: '400', paddingLeft: '20px' }}>
                                    {goal.daily_goal.toFixed(2)} kg CO₂
                                </Text>
                                <br />
                                <Button
                                    onClick={() => deleteGoal(goal.id)}
                                    style={{ backgroundColor: 'red', color: 'white', borderColor: 'red', marginTop: '10px',width:'150px' }}
                                >
                                    Delete Goal
                                </Button>
                            </Card>
                        ))}
                    </div>
                )}
            </div>:<NoDataTakeSurvey/>}
        </div>
    );
};

export default Goals;
