import React from 'react';
import {Form, Input, Button} from 'antd';

export const LoginForm = ({onChange,onSubmit, user:{email,password}}) => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Form.Item label="Email" name="email" required>
      <Input placeholder="Email" name="email" value={email} onChange={onChange}/>
    </Form.Item>
    <Form.Item label="Contraseña" name="password" required>
      <Input.Password value={password} onChange={onChange} name="password"/>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">Iniciar Sesión</Button>
    </Form.Item>
  </Form>
);