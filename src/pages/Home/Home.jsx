import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import dashpic from './dash.png'
import Quotes from './QuoteGrid'
import NewsGrid from './NewsGrid'
import { useNavigate } from 'react-router'
import './Home.css'

function HomeNew() {
    const navigate = useNavigate()
  return (
    <div className='home'>
        <Navbar/>

        <div className="home-pg1">
            <div className="pg1-left">
                <div className='main-headings-p'>
                    <p>Track, Offset and <span>Reduce</span> Your</p>
                    <p>Carbon <span>Footprint</span> with <span>Carbon Track</span></p>
                </div>

                <p style={{
                    fontSize:'12px',
                    fontWeight:'200'
                }}>
                    Carbon Track is your personal guide to understanding and managing your carbon footprint. 
                    By tracking daily activities across categories like transportation, energy, and waste, 
                    Carbon Track helps you see your impact, set realistic reduction goals, and 
                    offset emissions through eco-friendly actions. Monitor your progress, earn rewards, 
                    and join a community dedicated to making sustainable choices every day. Let’s reduce 
                    our carbon footprint together, one step at a time.</p>

                <div className='home-pg1-buttons'>
                    <button className='b1' onClick={()=>navigate('/register')}>Get Started</button>
                    <button className='b2'>Learn More</button>
                </div>
                <div>
                    <Quotes/>
                </div>
            </div>

            <div className="pg1-right">
                <img src={dashpic} alt="" className='dash-pic'/>
            </div>
            {/* <div style={{
            width: '100vw',
            height: '50px',  
            background: 'linear-gradient(to bottom, white, rgba(171, 222, 4,0.5))',//94d96f
            position:'absolute',
            bottom:'0'
        }}></div> */}
        </div>
{/* 
        <div style={{
            width: '100vw',
            height: '100px',  
            marginTop:'55px',
            background: 'linear-gradient(to top, white, rgba(171, 222, 4,0.5))',//94d96f
        }}></div> */}
        
        <h1 style={{
            marginLeft:'60px',
            fontSize:'40px',
            fontFamily:'Georgia',
            marginTop:'40px'
        }}>Related news</h1>
        <hr style={{width:'60%',marginLeft:'60px',opacity:'15%'}}/>
        <NewsGrid/>
    </div>
  )
}

export default HomeNew