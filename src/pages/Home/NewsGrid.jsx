import React, { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';

const NewsGrid = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'Carbon Footprint OR Climate Change OR Global Warming OR Environment OR Sustainability',
            apiKey: '4c06d98b8110491e9d0a651befb46430',
            language: 'en',
            sortBy: 'relevancy',
          },
        });

        const filteredArticles = response.data.articles.filter(
          (article) => article.urlToImage && article.title && article.description
        );

        setArticles(filteredArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [articles.length]);

  useEffect(() => {
    setDisplayedTitle('');
    setIsDeleting(false);
  }, [currentIndex]);

  // Typing effect
  useEffect(() => {
    const currentTitle = articles[currentIndex]?.title || '';
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedTitle((prev) => prev.slice(0, -1));
        if (displayedTitle === '') {
          setIsDeleting(false);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayedTitle((prev) => currentTitle.slice(0, prev.length + 1));
        if (displayedTitle === currentTitle) {
          setIsDeleting(true);
        }
      }, 70);
    }

    return () => clearTimeout(timer);
  }, [displayedTitle, isDeleting, articles, currentIndex]);

  // Blinking cursor effect
  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? articles.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const article = articles[currentIndex];

  return (
    <div style={{ display: 'flex', height: '500px', padding: '30px' }}>
      <div style={{ flex: 1, padding: '30px' }}>
        <h2 style={{ fontSize: '32px', color: '#333', fontWeight: '400',fontFamily:'Georgia',backgroundColor:'rgba(171, 222, 4,0.3)' }}>
          {displayedTitle}
          <span style={{ opacity: blink ? 1 : 0 }}>|</span>
        </h2>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '10px' }}>{article?.description}</p>
        <a href={article?.url} target="_blank" rel="noopener noreferrer" style={{ color: '#abde04', fontSize: '16px' }}>
          Read more
        </a>
        <div style={{ marginTop: '20px' }}>
          <LeftOutlined onClick={handlePrevious} style={{ cursor: 'pointer', fontSize: '20px', marginRight: '20px' }} />
          <RightOutlined onClick={handleNext} style={{ cursor: 'pointer', fontSize: '20px' }} />
        </div>
      </div>
      <div style={{ flex: 1, padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {article?.urlToImage && (
          <img
            src={article.urlToImage}
            alt="news"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
              borderRadius: '3px',
              boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default NewsGrid;
