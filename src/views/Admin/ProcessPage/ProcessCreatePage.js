import React, {Component} from 'react';
import ProcessForm from './ProcessCreateForm';
import { Typography, Breadcrumb } from 'antd';
const { Title } = Typography;

class ProcessCreatePage extends Component {

  render(){
    return (
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href='/admin/procesos'>Procesos</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Crear nuevo proceso</Breadcrumb.Item>
        </Breadcrumb>
        <Title>Crear nuevo proceso</Title>
        <ProcessForm {...this.props}/>
      </div>
    );
  }
}

export default ProcessCreatePage;