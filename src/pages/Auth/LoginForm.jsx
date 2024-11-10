import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { Link } from 'react-router-dom';
const App = ({onSubmit}) => {
  const onFinish = (values) => {
    onSubmit(values)
  };
  return (
    <Form
      className="login-componenent"
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        minWidth: '60%',
      }}
      onFinish={onFinish}
    >
      <h1 style={{marginBottom:'50px'}}>Login</h1>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
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
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item style={{display:'flex',flexDirection:'column',gap:'100px'}}>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>

        <div>
          <Link to='/register'>Dont have an account yet?</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
export default App;