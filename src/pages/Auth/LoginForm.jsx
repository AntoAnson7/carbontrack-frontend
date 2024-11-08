import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form } from 'antd';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit }) => {
  return (
    <Form
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: 460,
      }}
      onFinish={onSubmit}  
    >
      <h1>Login</h1>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserOutlined style={{ marginRight: '8px',marginBottom:'15px' }} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            style={{
              width: '100%',
              height:'50px',
              padding: '8px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              outline:'none',
              // border:'2px solid #abde04',
            }}
          />
        </div>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <div style={{ display: 'flex',alignItems:'center' }}>
          <LockOutlined style={{ marginRight: '8px',marginBottom:'15px' }} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={{
              width: '100%',
              height:'50px',
              padding: '8px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              outline:'none',
              // border:'2px solid #abde04',
            }}
          />
        </div>
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Checkbox style={{ display: 'flex', alignItems: 'center',paddingLeft:'22px' }}>Remember me</Checkbox>
          <p style={{ margin: 0 }}>Forgot password?</p>
        </div>
      </Form.Item>

      <Form.Item style={{display:'flex',alignItems:'start'}}>
        <button type="submit" style={{width:'150px',marginLeft:'23px'}}>
          Log in
        </button>
      </Form.Item>

      <Link to="/register" style={{ textDecoration: 'none', color: 'black'}}>
        Don't have an account? <span>Sign Up.</span>
      </Link>
    </Form>
  );
};

export default LoginForm;
