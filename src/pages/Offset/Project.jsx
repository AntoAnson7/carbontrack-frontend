import React from 'react';
import { Card, Typography, Tag, List,Button, message } from 'antd';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const { Title, Paragraph, Text } = Typography;

function Project({ project }) {
  const user = useSelector((state)=>state.user.user)
  const offsetPotentialKg = project.offset_potential_tons * 1000;

  const handleEnrollment=async()=>{
      if(!user){
        message.error(`Please Sign In before you can enroll in offset projects`)
      }else{
        message.success(`Congrats you have enrolled in the project "${project.name}"`)
      }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: '20px',paddingLeft:'20px' }}
    >
        <Card
        hoverable
        // cover={<img alt={project.name} src={project.image_url} style={{ maxHeight: '200px', objectFit: 'cover' }} />}
        style={{ width: '100%',height:'fit-content', margin: '10px',boxShadow:'3px 3px 10px rgba(0,0,0,0.1)'}}
        >
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                <Title level={4}>{project.name}</Title>
                <Tag color="green">{project.category}</Tag>
                <Paragraph ellipsis={{ rows: 3, expandable: true }}>{project.description}</Paragraph>
                
                <Text strong>Location: </Text><Text>{project.location}</Text>
                
                <Title level={5} style={{ color: '#52c41a', marginTop: '15px',fontSize:'22px' }}>
                    Offset Potential: {offsetPotentialKg} kg CO₂
                </Title>
                
                <List
                    header={<Text strong>Benefits</Text>}
                    dataSource={project.benefits}
                    renderItem={benefit => <List.Item>- {benefit}</List.Item>}
                    size="small"
                    style={{ paddingTop: '10px' }}
                />
                <List
                    header={<Text strong>Activities</Text>}
                    dataSource={project.activities}
                    renderItem={activity => <List.Item>- {activity}</List.Item>}
                    size="small"
                    style={{ paddingTop: '10px' }}
                />
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Text style={{ color: '#1890ff', marginTop: '15px',paddingLeft:'5px', display: 'inline-block' }}>
                    Learn more about this project ...
                    </Text>
                </a>
            </a>
            <br />
            <Button style={{ marginTop: '16px',backgroundColor:'#abde04',color:'white'}} onClick={handleEnrollment}>
                Mark Your Enrollment
            </Button>
        </Card>
    </motion.div>
  );
}

export default Project;
