import React, { useState } from 'react';
import { Card, Spin, Tag, Typography, List, Avatar, Button, Badge, notification } from 'antd';
import ReactMarkdown from 'react-markdown';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages"; 
import { prompt } from './prompter'; 
import carbonbuddy from './carbonbuddy.png'
import { PoweroffOutlined,MessageOutlined } from '@ant-design/icons';

// Styling for the chatbot and its sliding effect
const chatbotStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
  padding: '10px',
  borderRadius: '8px',
  zIndex: 1000,
  width: '300px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
};

const chatContainerStyles = {
  position: 'fixed',
  bottom: '70px',
  right: '20px',
  width: '500px',
  height: '400px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
  borderRadius: '8px',
  overflowY: 'auto',
  padding: '20px',
  display: 'none', // Initially hidden, will be shown on click
  zIndex: 1000,
  paddingBottom: '50px', // Add some space for the button at the bottom
};

const { Title, Text } = Typography;

const Chatbot = () => {
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Track if the chat window is open
  const [showNotification, setShowNotification] = useState(true); // Track notification bubble
  const [errorMessage, setErrorMessage] = useState(null); // Track error messages

  const fetchSuggestions = async () => {
    setLoading(true);
    setErrorMessage(null);
    if(localStorage.getItem('suggestions')){
      console.log(localStorage.getItem('suggestions'))
      setSuggestions(localStorage.getItem('suggestions'))
      console.log(localStorage.getItem('suggestions'))
      setLoading(false)
    }
    else{
      try {
        const vision = new ChatGoogleGenerativeAI({
          modelName: "gemini-1.5-pro", 
          apiKey: process.env.REACT_APP_GEMINI_API_KEY,
        });
  
        const contents = [
          new HumanMessage({
            content: prompt,
          }),
        ];
  
        const response = await vision.call(contents);
        localStorage.setItem('suggestions',response.content)
        setSuggestions(response.content);
        notification.success({
          message: 'AI Suggestions Loaded',
          description: 'AI suggestions to reduce carbon footprints have been loaded successfully.',
        });
      } catch (error) {
        setErrorMessage("Can't get suggestions now. Please try again later.");
        localStorage.removeItem('suggestions')
        notification.error({
          message: 'Error',
          description: 'Unable to retrieve suggestions at the moment.',
        });
      } finally {
        setLoading(false);
      }
    }

  };

  return (
    <div>
      <div
        style={{ 
          ...chatbotStyles, 
          transform: isOpen ? 'translateY(-100%)' : 'translateY(0)' 
        }}
        onClick={() => setIsOpen(true)}
      >
        <Avatar src={carbonbuddy} style={{ marginRight: '10px' }} />
        <span style={{ color: '#abde04' }}>Carbon Buddy</span>
        {showNotification && (
          <Badge 
            count={1} 
            style={{
              backgroundColor: '#abde04',
              position: 'absolute',
              top: '-30px',
              left: '-160px',
              width:'10px'
            }}
          />
        )}
      </div>

      <div style={{ ...chatContainerStyles, display: isOpen ? 'block' : 'none' }}>
        <Button onClick={() => setIsOpen(false)} color="danger" variant="outlined" style={{
          position: 'absolute',
          right: '20px',
          width: '10px',
          height: '30px'
        }}>
          <PoweroffOutlined />
        </Button>

        <Title level={4} style={{ color: '#abde04' }}>AI Suggestions</Title>
        <Card loading={loading} style={{ maxWidth: '100%' }}>
          <div>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Spin size="large" tip="Getting AI suggestions..." />
              </div>
            ) : (
              <div>
                <List
                  bordered
                  dataSource={suggestions.split("\n")}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Tag color="#abde04" style={{ marginBottom: '10px' }}>
                          Suggestion {index + 1}
                        </Tag>
                        <Text>{item}</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            )}
            {errorMessage && (
              <Text type="danger" style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}>
                {errorMessage}
              </Text>
            )}
          </div>
          {!loading && !errorMessage && (
            <Button
              color="primary" variant="outlined" 
              style={{
                width:'fit-content',
                position:'absolute',
                bottom:'-200px',
                right:'0px'
              }}
              
              onClick={fetchSuggestions}
            >
              Get AI Suggestions <MessageOutlined style={{marginTop:'2px'}}/>
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
