import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

const NewsCarousel = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'Carbon Footprint OR Climate Change & Global Warming OR Environment OR Sustainability Practices',
            apiKey: '4c06d98b8110491e9d0a651befb46430', // Replace with your API key
            language: 'en',
            sortBy: 'relevancy',
          },
        });

        // Filter out articles without images, title, or description
        const filteredArticles = response.data.articles.filter(
          (article) => article.urlToImage && article.title && article.description
        );

        setArticles(filteredArticles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    // Update currentIndex every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 8) % articles.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [articles.length]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color:'#abde04' }} spin />} />
      </div>
    );
  }

  // Get the current batch of 8 articles to display
  const displayArticles = articles.slice(currentIndex, currentIndex + 6);

  return (
    <div style={{ textAlign: 'center', padding: '20px', width:'95vw' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Related News</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Row gutter={[30, 30]} style={{ maxWidth: '1200px', width: '100%' }}>
          {displayArticles.map((article, index) => (
            <Col key={index} xs={24} sm={12} md={6} lg={8}>
              <Card
                hoverable
                style={{
                  width: '100%',
                  height: '380px',
                  overflow: 'hidden',
                  border: '2px solid #abde04',
                  boxShadow: '0 4px 8px rgba(171, 222, 4, 0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                cover={
                  <img
                    alt="news"
                    src={article.urlToImage}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(171, 222, 4, 0.5)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(171, 222, 4, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Card.Meta title={article.title} description={article.description} />
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#abde04' }}>
                  Read more
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default NewsCarousel;
