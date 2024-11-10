import React from 'react';
import { Col, Card, Statistic,Collapse, Typography, Row } from 'antd';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { Link } from 'react-router-dom';

const { Text } = Typography;
const { Panel } = Collapse;


function DashboardPage1({ data, enrolledIn, giftCards,getComparisonText }) {
    const totalOffset = enrolledIn.reduce((sum, project) => sum + project.offset_potential_tons * 1000, 0); 
    const cumulativeEmissionOffset = data[1].value - totalOffset;

    return (
        <div className="dash-pg-1" style={{ padding: '10px', paddingLeft: '15px' }}>
            <div className="daily-yearly" style={{
                display:'flex',
                flexDirection:'column'
            }}>
                
                <div className="row-1" style={{display:'flex',justifyContent:'space-between',alignItems:'start' }} >
                    <div>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
                            <div style={{ marginBottom: '10px'}}>
                                <Card title="Cumulative Footprint (Emission - Offset)" bordered style={{ width: '100%',boxShadow:'3px 3px 10px rgba(0,0,0,0.1)' }}>
                                    <Statistic
                                        title="Net Emission (kg CO₂)"
                                        value={cumulativeEmissionOffset}
                                        precision={2}
                                        valueStyle={{ color: cumulativeEmissionOffset > 0 ? '#ff4d4f' : '#52c41a' }}
                                    />
                                    <Text type={cumulativeEmissionOffset > 0 ? 'warning' : 'success'}>
                                        {cumulativeEmissionOffset > 0 ? "Try to reduce further!" : "Great job offsetting emissions!"}
                                    </Text>
                                </Card>
                            </div>
                            {/* Total Offset Card */}
                            <Card 
                                title="Total Offset" 
                                bordered 
                                style={{ width: '100%', boxShadow: '3px 3px 10px rgba(0,0,0,0.1)' }}
                            >
                                <Statistic
                                    title="Offset Achieved (kg CO₂)"
                                    value={totalOffset}
                                    precision={2}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                                {totalOffset>0?
                                <Text type="success">Keep up the good work offsetting emissions!</Text>:
                                <Link to='/offset' style={{textDecoration:'none'}}>
                                    <Text type="warning" style={{textDecoration:'underline'}}>Enroll in offset programs to offset your footprint!</Text>
                                </Link>
                                }
                            </Card>
                        </div>
                        </div>

                        {/* Daily*/}
                        <Col span={8}>
                            <Card title={`${data[0].category} Footprint`} bordered style={{boxShadow:'3px 3px 10px rgba(0,0,0,0.1)'}}>
                                <Statistic title="Emissions (kg CO₂)" value={data[0].value} precision={2} />
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={[{ name: data[0].category, user: data[0].value, average: data[0].average }]}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="user" fill="#8884d8" name="Your Emissions" />
                                        <Bar dataKey="average" fill="#82ca9d" name="National Average" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <Text type={data[0].value < data[0].average ? 'success' : 'warning'}>
                                    {getComparisonText(data[0].value, data[0].average)}
                                </Text>
                            </Card>
                        </Col>

                        {/* Yearly */}
                        <Col span={8}>
                            <Card title={`Projected ${data[1].category} Footprint`} bordered style={{boxShadow:'3px 3px 10px rgba(0,0,0,0.1)'}}>
                                <Statistic title="Emissions (kg CO₂)" value={data[1].value} precision={2} />
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={[{ name: data[1].category, user: data[1].value, average: data[1].average }]}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="user" fill="#8884d8" name="Your Emissions" />
                                        <Bar dataKey="average" fill="#82ca9d" name="National Average" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <Text type={data[1].value < data[1].average ? 'success' : 'warning'}>
                                    {getComparisonText(data[1].value, data[1].average)}
                                </Text>
                            </Card>
                        </Col>
                    </div>


                    

            </div>
        </div>
    );
}

export default DashboardPage1;
