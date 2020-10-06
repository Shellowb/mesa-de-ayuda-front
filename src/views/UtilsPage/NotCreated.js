import React from 'react';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';

function NotCreated() {
  return (
    <Result
      status="500"
      title="Pagina en construcción"
      subTitle="Nuestros ingenieros estan creando esta pagina... te sugerimos ver videos de gatitos mientras tanto"
      extra={<Button type="primary" href="https://www.youtube.com/watch?v=z6EchXyieos">Ver gatos</Button>}
    />
  );
}

export default NotCreated;