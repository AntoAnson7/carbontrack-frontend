// import React from 'react';
// import { Card, Row, Col } from 'antd';

// const allTips = [
//   { tip: "Use public transportation or carpool to reduce emissions.", icon: "🚌" },
//   { tip: "Switch to energy-efficient light bulbs to save electricity.", icon: "💡" },
//   { tip: "Reduce, reuse, and recycle to minimize waste.", icon: "♻️" },
//   { tip: "Unplug electronic devices when not in use.", icon: "🔌" },
//   { tip: "Use reusable bags instead of plastic ones.", icon: "🛍️" },
//   { tip: "Conserve water by taking shorter showers.", icon: "🚿" },
//   { tip: "Opt for plant-based meals to reduce food-related emissions.", icon: "🥦" },
//   { tip: "Shop locally to lower transportation emissions.", icon: "🏬" },
//   { tip: "Compost organic waste to enrich soil and reduce landfill use.", icon: "🌱" },
//   { tip: "Air dry clothes instead of using a dryer.", icon: "👕" },
//   { tip: "Adjust your thermostat to save energy.", icon: "🌡️" },
//   { tip: "Reduce air travel and opt for virtual meetings when possible.", icon: "✈️" }
// ];

// const TipGrid = () => {
//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h2 style={{ marginBottom: '20px', color: '#333', fontFamily: 'Trebuchet MS' }}>Tips to Reduce Your Carbon Footprint</h2>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <Row gutter={[24, 24]} style={{ maxWidth: '1200px', width: '100%' }}>
//           {allTips.map((tip, index) => (
//             <Col key={index} xs={24} sm={12} md={6} lg={8}>
//               <Card
//                 hoverable
//                 style={{
//                   width: '100%',
//                   height: '150px',  // Increased the height to fit all text
//                   backgroundColor: '#abde04',
//                   boxShadow: '0 4px 8px rgba(171, 222, 4, 0.2)',
//                   color: 'white',
//                   fontFamily: 'Trebuchet MS',
//                   textAlign: 'center',
//                   transition: 'transform 0.3s, box-shadow 0.3s', // Smooth transition for hover effect
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = 'scale(1.05)';
//                   e.currentTarget.style.boxShadow = '0 6px 12px rgba(171, 222, 4, 0.5)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = 'scale(1)';
//                   e.currentTarget.style.boxShadow = '0 4px 8px rgba(171, 222, 4, 0.2)';
//                 }}
//               >
//                 <div style={{ fontSize: '30px', marginBottom: '10px' }}>
//                   {tip.icon}
//                 </div>
//                 <Card.Meta
//                   title={<div style={{ fontSize: '16px', fontWeight: 'bold', objectFit:'contain' }}>{tip.tip}</div>}
//                 />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default TipGrid;


import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';

// Array of all tips
const allTips = [
  { tip: "Use public transportation or carpool to reduce emissions.", icon: "🚌" },
  { tip: "Switch to energy-efficient light bulbs to save electricity.", icon: "💡" },
  { tip: "Reduce, reuse, and recycle to minimize waste.", icon: "♻️" },
  { tip: "Unplug electronic devices when not in use.", icon: "🔌" },
  { tip: "Use reusable bags instead of plastic ones.", icon: "🛍️" },
  { tip: "Conserve water by taking shorter showers.", icon: "🚿" },
  { tip: "Opt for plant-based meals to reduce food-related emissions.", icon: "🥦" },
  { tip: "Shop locally to lower transportation emissions.", icon: "🏬" },
  { tip: "Compost organic waste to enrich soil and reduce landfill use.", icon: "🌱" },
  { tip: "Air dry clothes instead of using a dryer.", icon: "👕" },
  { tip: "Adjust your thermostat to save energy.", icon: "🌡️" },
  { tip: "Reduce air travel and opt for virtual meetings when possible.", icon: "✈️" }
];

// Function to get a set of 4 tips for display based on index
const getTipsForDisplay = (tips, startIndex) => {
  return tips.slice(startIndex, startIndex + 4);
};

const TipGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTips, setDisplayedTips] = useState(getTipsForDisplay(allTips, currentIndex));

  useEffect(() => {
    const interval = setInterval(() => {
      // Update to the next set of 4 tips
      const nextIndex = (currentIndex + 4) % allTips.length;
      setCurrentIndex(nextIndex);
      setDisplayedTips(getTipsForDisplay(allTips, nextIndex));
    }, 6000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div style={{ textAlign: 'center', padding: '20px', width:'95vw' }}>
      <h2 style={{ marginBottom: '20px', color: '#333'}}>
        Tips to Reduce Your Carbon Footprint
      </h2>
      <div style={{padding:'10px', display:'grid', justifyItems:'center' }}>
        <Row gutter={[25, 25]} style={{ maxWidth: '1200px', width: '100%' }}>
          {displayedTips.map((tip, index) => (
            <Col key={index} >
              <Card
                hoverable
                style={{
                  width: '540px',
                  height: '150px',
                  border:'none',
                  background: 'linear-gradient(45deg, #abde04, #f1f8b3)',
                  boxShadow: '0 4px 8px rgba(171, 222, 4, 0.2)', // Subtle shadow with matching color
                  color: 'white',
                  fontFamily: 'Trebuchet MS',
                  
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition
                }}
                className="tip-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(171, 222, 4, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(171, 222, 4, 0.2)';
                }}
              >
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>
                  {tip.icon}
                </div>
                <Card.Meta
                  title={<div style={{ fontSize: '16px', fontWeight: 'bold' }}>{tip.tip}</div>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TipGrid;
