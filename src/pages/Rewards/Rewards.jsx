import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Typography, Tag, message } from 'antd';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { giftCards } from './giftCards';
import './Rewards.css';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

function Rewards() {
  const navigate = useNavigate();
  const [claimedRewards, setClaimedRewards] = useState([]);
  const profile = useSelector(state => state.profile.profile);
  const yearlyCarbonFootprint = profile?.yearly_carbon_footprint || 0;

  useEffect(() => {
    !localStorage.getItem('token') && navigate('/unauthorized');
    const savedRewards = JSON.parse(localStorage.getItem('claimed_rewards')) || [];
    setClaimedRewards(savedRewards);
  }, [navigate]);

  const handleClaimReward = (rewardId) => {
    if (!claimedRewards.includes(rewardId)) {
      const updatedClaimedRewards = [...claimedRewards, rewardId];
      setClaimedRewards(updatedClaimedRewards);
      localStorage.setItem('claimed_rewards', JSON.stringify(updatedClaimedRewards));

      message.success(`Woohoo! You have claimed a ${giftCards.find((gift)=>gift.id==rewardId).name}`);
    }
  };

  const tempClaimClear=()=>{
    localStorage.removeItem('claimed_rewards')
    window.location.reload()
  }

  return (
    <div style={{ padding: '20px 40px 20px 296px' }}>
      <Title level={2}>Rewards for Sustainable <span onClick={()=>tempClaimClear()}>Actions</span></Title>
      <Text>
        Your Current Carbon Footprint: 
        <span style={{ color: 'green', fontSize: '16px' }}>{yearlyCarbonFootprint.toFixed()} kg CO₂/year</span>
      </Text>

      {/* Unclaimed Rewards Section */}
      <Row gutter={[24, 24]} style={{ marginTop: '20px' }}>
        {giftCards.filter(reward => !claimedRewards.includes(reward.id)).map(reward => {
          const canClaim = yearlyCarbonFootprint <= reward.threshold;
          return (
            <Col key={reward.id} span={8}>
              <motion.div whileHover={{ scale: 1.01 }}>
                <Card
                  title={reward.name}
                  cover={<img alt={reward.name} src={reward.image} style={{ height: 200, objectFit: 'contain', padding: '20px' }} />}
                  style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
                >
                  <Tag color={canClaim ? 'green' : 'red'} style={{ width: '100px' }}>
                    {canClaim ? "Claimable" : "Not Claimable"}
                  </Tag>
                  <Text>{reward.description}</Text>
                  <div style={{ marginTop: '15px' }}>
                    <Button
                      type="primary"
                      disabled={!canClaim}
                      onClick={() => handleClaimReward(reward.id)}
                      style={{ backgroundColor: '#c4e84f', borderColor: '#c4e84f' }}
                    >
                      Claim Reward
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>

      {/* Claimed Rewards Section */}
      {claimedRewards.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <Title level={3}>Claimed Rewards</Title>
          <Row gutter={[24, 24]}>
            {claimedRewards.map(rewardId => {
              const reward = giftCards.find(g => g.id === rewardId);
              return (
                <Col key={reward.id} span={8}>
                  <Card
                    title={reward.name}
                    cover={<img alt={reward.name} src={reward.image} style={{ height: 200, objectFit: 'contain', padding: '20px' }} />}
                    style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', opacity: '60%' }}
                  >
                    <Tag color="green" style={{ width: '100px' }}>
                      Claimed
                    </Tag>
                    <Text>{reward.description}</Text>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </div>
  );
}

export default Rewards;
