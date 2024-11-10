import React, { useState } from 'react';
import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { clearUser } from '../../Redux/userSlice';
import { clearProfile } from '../../Redux/profileSlice';
import logo from '../Navbar/logo.png'
import { AppstoreOutlined,LockOutlined,SignatureOutlined,LoginOutlined,TrophyOutlined,RadarChartOutlined, SettingOutlined,HomeOutlined,ProfileOutlined,CodeSandboxOutlined } from '@ant-design/icons';
import './Sidebar.css'



const items = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: <Link to='/'>Home</Link>,
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: <Link to='/dashboard'>Dashboard</Link>,
  },
  {
    key: '3',
    icon: <ProfileOutlined />,
    label:<Link to='/profile'>Profile</Link>,
  },

  {
    key: '4',
    icon: <CodeSandboxOutlined />,
    label: <Link to='/sandbox'>Sandbox</Link>,
  },

  {
    key: '5',
    icon: <RadarChartOutlined />,
    label: <Link to='/offset'>Offset Programs</Link>,
  },

  {
    key: '6',
    icon: <SettingOutlined />,
    label: <Link to='/goals'>Set Goals</Link>,
  },

  {
    key: '7',
    icon: <TrophyOutlined />,
    label: <Link to='/rewards'>Rewards</Link>,
  },

  {
    key: '8',
    icon: <LockOutlined />,
    label: 'Authenticate',
    children: [
      { key: '81',icon:<LoginOutlined />, label: <Link to='/login'>Login</Link>},
      { key: '82',icon:<SignatureOutlined />, label: <Link to='/register'>Register</Link>},
    ],
  },
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items);

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user.user)
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);

  const HandleLogout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('temp_access');
    localStorage.removeItem('token');
    localStorage.removeItem('claimed_rewards')
    localStorage.removeItem('suggestions')
    dispatch(clearUser());
    dispatch(clearProfile());
    navigate('/');
  }

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);

    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <div 
      className='sidebar-main' style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: 256,
        position: 'fixed',
        padding: '10px',
        backgroundColor:'white',
        boxShadow: '4px 0px 10px rgba(0,0,0,0.06)',
      }}>

      <div style={{display:'flex',alignItems:'center',marginBottom:'100px'}}>
        <img src={logo} style={{maxWidth:'75px'}}/>
        <p style={{ 
            fontWeight: 'bold', 
            fontSize: '20px', 
            paddingTop:'10px',
            margin:0,
            marginBottom:'8px'
        }}
        >
            CARBON<span style={{color:'#abde04'}}>TRACK</span>
            </p>
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={['231']}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        items={items}
      />

      {localStorage.getItem('token')&&<button className='sidebar-logout-button' onClick={HandleLogout}>Logout</button>}
    </div>
  );
};

export default Sidebar;
