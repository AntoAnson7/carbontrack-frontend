import React from 'react';
import NewsGrid from '../NewsGrid';
import QuoteGrid from '../QuoteGrid';
import TipGrid from '../TipGrid';
import Header from '../Header';
import Navbar from '../../../components/Navbar/Navbar';
import './styles.css' 

const Home = () => {

  return (
    <div className="home-page1">
      <Navbar/>
      <Header/>
      <div id='content'>
      <TipGrid/>
      <QuoteGrid/>
      <NewsGrid/>
      </div>
    </div>
  );
};

export default Home;
