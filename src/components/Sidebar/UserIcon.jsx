import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';

const UserIcon = ({ username }) => {
  const [color, setColor] = useState('#000');

  useEffect(() => {
    // Generate a random color for each username
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setColor(randomColor);
  }, [username]);

  return (
    <Avatar
      style={{
        backgroundColor: color,
        verticalAlign: 'middle',
        cursor: 'pointer',
      }}
      size="large"
      title={username ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() : ""}
    >
      {username ? username.charAt(0).toUpperCase() : ""}
    </Avatar>
  );
};

export default UserIcon;
