import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';

// Consolidated array of quotes
const allQuotes = [
  { quote: "The Earth is what we all have in common.", person: "Wendell Berry" },
  { quote: "We do not inherit the earth from our ancestors, we borrow it from our children.", person: "Native American Proverb" },
  { quote: "The greatest threat to our planet is the belief that someone else will save it.", person: "Robert Swan" },
  { quote: "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves and to our fellow man.", person: "Mahatma Gandhi" },
  { quote: "We can’t save the world unless we change the way we live.", person: "Jane Goodall" },
  { quote: "It's not about being green, it's about being conscious.", person: "Al Gore" },
  { quote: "Act as if what you do makes a difference. It does.", person: "William James" },
  { quote: "The time to act is now.", person: "Greta Thunberg" },
  // Add more quotes here if needed
];

const getRandomQuotes = (quotes, num) => {
  // Shuffle the array and return a subset of `num` items
  const shuffled = [...quotes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const QuoteGrid = () => {
  const [quotes, setQuotes] = useState(getRandomQuotes(allQuotes, 4));

  useEffect(() => {
    const interval = setInterval(() => {
      setQuotes(getRandomQuotes(allQuotes, 4));
    }, 10000);

    // Cleanup interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px', width:'95vw' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Inspirational Quotes</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Row gutter={[24, 24]} style={{ maxWidth: '900px', width: '100%' }}>
          {quotes.map((quote, index) => (
            <Col key={index} xs={24} sm={12} md={6} lg={12}>
              <Card
                hoverable
                style={{
                  width: '100%',
                  height: '150px',
                  border: '3px solid #abde04',
                  borderRadius: '100px',
                  boxShadow: '0 4px 8px rgba(171, 222, 4, 0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  backgroundColor: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 5px 10px rgba(171, 222, 4, 0.5)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(171, 222, 4, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Card.Meta
                  title={<div style={{ color: '#abde04', fontSize:'large' }}>{quote.person}</div>}
                  description={<div style={{ fontSize:'larger', fontStyle: 'italic', fontWeight:'bold', color: '#333' }}>"{quote.quote}"</div>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default QuoteGrid;
