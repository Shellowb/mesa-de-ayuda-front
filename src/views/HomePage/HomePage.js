import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './HomePage.css';
import '../../utils/header.css';
import FooterComponent from '../UtilsPage/Footer.js';
import Banner from '../UtilsPage/Banner.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProcessApi from '../../api/processRepository';
import FAQPublic from './FAQPublic/FAQPublic';

import { LoadingOutlined } from '@ant-design/icons';
import { faUserGraduate, faBriefcase, faRocket, faClock, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Button, Card, Typography, notification, Spin} from 'antd';


const { Title, Text } = Typography;

class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      process: null,
      all: null,
      seeAll: false,
      icons: {
        'faUserGraduate': faUserGraduate,
        'faBriefcase': faBriefcase,
        'faRocket': faRocket,
        'faClock': faClock,
        'faQuestionCircle': faQuestionCircle
      }
    };
  }

  componentDidMount(){
    ProcessApi.getProcessPublished()
      .then(response => {
        this.setState({process: response.slice(0,4), all: response});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente los procesos'});
    });
  }

  seeAll(){
    this.setState({seeAll: !this.state.seeAll});
    if (this.state.seeAll){
      this.setState({process: this.state.all.slice(0,4)});
    } else {
      this.setState({process: this.state.all});
    }
  }

  render(){
    if(this.state.process == null){
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }

    return (
      <>
        <div class='img-banner'>
          <Row justify='center'>
            <Col xs={{span: 20}} md={{span: 12}} lg={{span: 12}} xl={{span: 12}} class='banner-size'>
              <div class='banner-size'>
              <Row><Title level={2}><span class='text'>Bienvenido a la plataforma de Mesa de Ayuda DCC</span></Title></Row>
              <Row><Title level={5}><span class='text'>Aquí podras obtener información sobre procesos actuales del departamento y resolver tus preguntas frecuentes</span></Title></Row>
              </div>
            </Col>
          </Row>
        </div>
        <div >
          <Card
            style={{ 
              width: '100%' , 
              height:'100%',
              border: 0,
              borderRadius: '0px',
              padding:'3%'
            }}
          >
            <Title level={4}>Procesos Actuales</Title>
            <Row  gutter={[16, 16]}>
            {this.state.process.map((process) => {
              return (
                <Col xs={{span: 24}} md={{span: 12}} lg={{span: 6}} xl={{span: 6}}>
                  <a href={`/categorias/${process.id}`}>
                  <Card 
                    style={{ 
                      borderRadius: '11px',
                      backgroundColor: '#F3F6F7',
                      border: 0,
                      textAlign:"center",
                      height:'100%',
                    }}
                  >
                    <FontAwesomeIcon icon={this.state.icons[process.icon]} size="2x" color="#757575"/>
                    <p/>
                    <Title level={4}>{process.name}</Title>
                    <div dangerouslySetInnerHTML={{__html: process.banner_description}} />
                    <Text strong>+info</Text>
                  </Card>
                  </a>
                </Col>
              );
            })}
          </Row>

          
            {this.state.all.length > 4 ? 
              (this.state.seeAll ? (<Row justify="center">
              <Button type="primary" onClick={() => {this.seeAll()}}>
                Ver menos procesos
              </Button>
              </Row >) : (<Row justify="center">
              <Button type="primary" onClick={() => {this.seeAll()}} danger>
                Ver mas procesos
              </Button>
              </Row >)) :
              <></>
            }
            
            <br/>
          </Card>
          <div
            style={{ 
              width: '100%' , 
              height:'100%',
              border: 0,
              padding:'5%',
              color:'#ccc'
            }}
          >
            <FAQPublic />
            
          </div>
        </div>
        
        <Banner />
        <FooterComponent />
      </>
    );
  }
}

export default HomePage;
