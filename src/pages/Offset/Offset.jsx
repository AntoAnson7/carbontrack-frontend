import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Project from './Project';
import { Row, Col, Input, Select } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import './Offset.css'

const { Search } = Input;
const { Option } = Select;

function Offset() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(()=>{
    !localStorage.getItem('token')&&navigate()    
  },[])

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/offsetprojects/');
      setProjects(res.data);
      setFilteredProjects(res.data);
    };
    fetchProjects();
  }, []);

  
  const handleSearch = (value) => {
    const searchResults = projects.filter(project =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProjects(searchResults);
  };

  
  const handleSortChange = (value) => {
    const sortedProjects = [...filteredProjects].sort((a, b) => {
      if (value === 'asc') {
        return a.offset_potential_tons - b.offset_potential_tons;
      } else if (value === 'desc') {
        return b.offset_potential_tons - a.offset_potential_tons;
      }
      return 0;
    });
    setFilteredProjects(sortedProjects);
  };

  return (
    <div className='offset-page' style={{ paddingLeft: 260,paddingRight:200}}>
      
      <div className="offset-page-header">
          <div className="offset-header-top">
              <h1 style={{ color: '#abde04'}}>Offset Projects</h1>
              <p>"Taking responsibility for our carbon footprint is more important than ever. By participating in carbon offset projects, you have the power to directly combat climate change, restore vital ecosystems, and support local communities. Each project, whether it's reforestation, renewable energy, or conservation, plays a crucial role in reducing the harmful impact of human activities on our planet. Offsetting carbon emissions is not just a choice—it's an essential step toward creating a sustainable future for generations to come. Your commitment today can make a lasting difference, helping to preserve biodiversity, improve air quality, and foster a healthier, more resilient world for all."</p>
          </div>
          <hr />

          <p style={{marginLeft:'30px',color:'#abde04',fontSize:'24px'}}>Browse projects,</p>
      </div>
      
      <motion.div
        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{paddingLeft:'30px',display:'flex',justifyContent:'space-between',margin:'0px 0 20px 0',alignItems:'center'}}
      >
      <Search
        placeholder="Search projects by name"
        onSearch={handleSearch}
        enterButton
        style={{
          width: '50%',
          backgroundColor: 'white',
          borderColor: '#abde04',
          borderRadius: '5px',
          color: '#abde04',
        }}
        allowClear
      />

        <Select
          placeholder="Sort by Offset Potential"
          onChange={handleSortChange}
          style={{
            width: '35%',
            backgroundColor: 'white',
            borderColor: '#c4e84f',
            borderRadius: '5px',
            color: '#333',
          }}
          allowClear
        >
          <Option value="asc">Offset Potential (Low to High)</Option>
          <Option value="desc">Offset Potential (High to Low)</Option>
        </Select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Row gutter={[24, 24]}>
          {filteredProjects.map((project) => (
            <Col key={project.id} xs={24} sm={24} md={24} lg={24} xl={24}>
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * Math.random() }}
              >
                <Project project={project} />
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </div>
  );
}

export default Offset;
