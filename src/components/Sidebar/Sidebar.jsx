import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import UserIcon from './UserIcon';
import './Sidebar.css'
import Logout from '../Logout/Logout';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: <Link to='/'>Home</Link>,
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: <Link to='/dashboard'>Dashboard</Link>,
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label:<Link to='/profile'>Profile</Link>,
  },

  {
    key: '4',
    icon: <SettingOutlined />,
    label: <Link to='/login'>Login</Link>,
  },

  {
    key: '5',
    icon: <SettingOutlined />,
    label: <Link to='/register'>Register</Link>,
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
    const user = useSelector((state)=>state.user.user)
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);

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
    <div className='sidebar-main' style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      width: 256,
      position: 'absolute',
      padding: '10px',
      backgroundColor:'white'
    }}>

      <div style={{ marginBottom: '20px'}}>
        <p style={{ 
            fontWeight: 'bold', 
            fontSize: '23px', 
            paddingLeft:'25px',
            paddingTop:'10px'
        }}
        >
            CARBON<span style={{color:'#abde04',fontStyle:'italic'}}>TRACK</span>
            </p>
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={['231']}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        items={items}
      />

      {user&&<div style={{ marginTop: '20px' }} className='sidebar-profile'>
        <UserIcon username={user?.username}/>
        <hr />
        <div className="sidebar-profile-right">
            <p style={{margin:0,opacity:'70%'}}>@{user.username}</p>
            <Logout/>
        </div>
      </div>}

      {!user&&
      <div style={{ marginTop: '20px' }} className='sidebar-profile'>
        <p>Not logged in</p>
      </div>}

    </div>
  );
};

export default Sidebar;
