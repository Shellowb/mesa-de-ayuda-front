import React, {Component} from 'react';
import InstancesAPI from '../../../api/instancesRepository';
import { Row, Space, Typography, notification, Col, Card, Spin } from 'antd';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;

class InstanceListComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      instances: null
    };
  }

  componentDidMount(){
    InstancesAPI.getInstancesPublishedByProcess(this.props.id)
      .then(response => {
        this.setState({instances: response})
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente la instancia'});
    });
  }

  render(){
    if(this.state.instances == null){
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }
    return(
      <div>
        <Title level={3}>Instancias</Title>
        <Row gutter={[16, 16]}>
          {this.state.instances.map((instance) => {
            return (
              <Col span={12}>
                <a href={`/categorias/${this.props.id}/instancia/${instance.id}`}>
                <Card 
                  style={{ 
                    borderRadius: '11px',
                    backgroundColor: '#F3F6F7',
                    border: 0,
                    textAlign:"center",
                    height:'100%',
                    
                  }}
                >
                <Space>
                  <FontAwesomeIcon icon={faUserGraduate} size="2x" color="#757575"/>
                  <p/>
                <Title level={4} >{instance.name}</Title>
                </Space>
                </Card>
                </a>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default InstanceListComponent;