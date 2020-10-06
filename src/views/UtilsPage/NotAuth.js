import React from 'react';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';

function NotAuth() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Lo sentimos, no tienes autorizacion para acceder a esta pagina"
      extra={<Button type="primary" href='/'>Volver al Inicio</Button>}
    />
  );
}

export default NotAuth;
