import React from 'react';
import 'antd/dist/antd.css';
import './HomePage.css';
import '../../utils/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faBriefcase, faRocket, faClock, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import { Layout, Row, Col, Button, Card, Typography} from 'antd';

import { Collapse } from 'antd';
const { Footer } = Layout;

const { Panel } = Collapse;


const { Title, Text } = Typography;


function HomePage() {
  return (
    <>
      <div class='img-background'>
        <Card
          style={{ 
            width: '100%' , 
            height:'100%',
            border: 0,
            borderRadius: '11px',
            padding:'3%'
          }}
        >
          <Title level={2}>Bienvenido a la plataforma de Mesa de Ayuda DCC</Title>
          <p>Aquí podras obtener información sobre procesos actuales del departamento y resolver tus preguntas frecuentes</p>
          <br/>

          <Title level={4}>Preguntas Frecuentes</Title>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card 
                style={{ 
                  borderRadius: '11px',
                  backgroundColor: '#F3F6F7',
                  border: 0,
                  textAlign:"center",
                  height:'100%',
                }}
              >
                <FontAwesomeIcon icon={faUserGraduate} size="2x" color="#757575"/>
                <p/>
                <Title level={4}>Proceso de Titulación</Title>
                <p>¿Estas por titularte? Informate sobre los plazos y consultas frecuentes del proceso de titulación</p>
                <Text strong>+info</Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card 
                style={{ 
                  borderRadius: '11px',
                  backgroundColor: '#F3F6F7',
                  border: 0,
                  textAlign:"center",
                  height:'100%',
                }}
              >
                <FontAwesomeIcon icon={faBriefcase} size="2x" color="#757575"/>
                <p/>
                <Title level={4}>Practicas Profesionales</Title>
                <p>Informate sobre los plazos de entrega de tu informe de practica profesional</p>
                <Text strong>+info</Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card 
                style={{ 
                  borderRadius: '11px',
                  backgroundColor: '#F3F6F7',
                  border: 0,
                  textAlign:"center",
                  height:'100%',
                }}
              >
                <FontAwesomeIcon icon={faRocket} size="2x" color="#757575"/>
                <p/>
                <Title level={4}>Mechón DCC</Title>
                <p>¿Eres mechon DCC? Aprende sobre el departamento y los procesos que este tiene</p>
                <Text strong>+info</Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card 
                style={{ 
                  borderRadius: '11px',
                  backgroundColor: '#F3F6F7',
                  border: 0,
                  textAlign:"center",
                  height:'100%',
                }}
              >
                <FontAwesomeIcon icon={faUserGraduate} size="2x" color="#757575"/> <FontAwesomeIcon icon={faUserGraduate} size="2x" color="#757575"/>
                <p/>
                <Title level={4}>Doble titulación</Title>
                <p>Informate sobre el proceso de doble titulación del DCC</p>
                <Text strong>+info</Text>
              </Card>
            </Col>
          </Row>

          <Row justify="center">
          <Button type="primary" danger>
            Todas las categorias
          </Button>
          </Row >
          
          <br/>
          <Row>
          
          <Title level={4}>Últimas preguntas</Title>
          <Col span={24}>
          <Collapse accordion
            expandIconPosition='right'
          >
            <Panel header="¿Qué significa el “E” y el “F”?" key="1" extra={[
              <Text><FontAwesomeIcon icon={faClock}/> Hace 5 minutos</Text>
            ]}>
              <ul>
                <li>El ‘E’ es el curso CC6908: Introducción al Trabajo de Título (antiguamente tenía el código CC69E); en el “E” hay que encontrar un tema, escribir una propuesta, y escribir un informe final con un avance en el trabajo. Tipicamente hay dos clases presenciales asociados con el “E” en las cuales se explicarán el proceso de titulación y los informes que hay que entregar; se publicarán notificaciones en el foro antes de cada clase.</li>
                <li>El ‘F’ es el curso CC6909: Trabajo de Título (antiguamente tenía el código CC69F); en el “F” hay que realizar el trabajo planteado anteriormente y entregar el informe final de la memoria.</li>
              </ul>
            </Panel>
            <Panel header="¿Quién puede guiar una memoria?" key="2" extra={[
              <Text><FontAwesomeIcon icon={faClock}/> Hace 5 minutos</Text>
            ]}>
            <ul>
                <li>El ‘E’ es el curso CC6908: Introducción al Trabajo de Título (antiguamente tenía el código CC69E); en el “E” hay que encontrar un tema, escribir una propuesta, y escribir un informe final con un avance en el trabajo. Tipicamente hay dos clases presenciales asociados con el “E” en las cuales se explicarán el proceso de titulación y los informes que hay que entregar; se publicarán notificaciones en el foro antes de cada clase.</li>
                <li>El ‘F’ es el curso CC6909: Trabajo de Título (antiguamente tenía el código CC69F); en el “F” hay que realizar el trabajo planteado anteriormente y entregar el informe final de la memoria.</li>
              </ul>
            </Panel>
            <Panel header="¿Cómo se calcula la nota de titulación?" key="3" extra={[
              <Text><FontAwesomeIcon icon={faClock}/> Hace 5 minutos</Text>
            ]}>
            <ul>
                <li>El ‘E’ es el curso CC6908: Introducción al Trabajo de Título (antiguamente tenía el código CC69E); en el “E” hay que encontrar un tema, escribir una propuesta, y escribir un informe final con un avance en el trabajo. Tipicamente hay dos clases presenciales asociados con el “E” en las cuales se explicarán el proceso de titulación y los informes que hay que entregar; se publicarán notificaciones en el foro antes de cada clase.</li>
                <li>El ‘F’ es el curso CC6909: Trabajo de Título (antiguamente tenía el código CC69F); en el “F” hay que realizar el trabajo planteado anteriormente y entregar el informe final de la memoria.</li>
              </ul>
            </Panel>
            <Panel header="¿Qué es la vía rápida? ¿Cómo funciona?" key="4" extra={[
              <Text><FontAwesomeIcon icon={faClock}/> Hace 5 minutos</Text>
            ]}>
            <ul>
                <li>El ‘E’ es el curso CC6908: Introducción al Trabajo de Título (antiguamente tenía el código CC69E); en el “E” hay que encontrar un tema, escribir una propuesta, y escribir un informe final con un avance en el trabajo. Tipicamente hay dos clases presenciales asociados con el “E” en las cuales se explicarán el proceso de titulación y los informes que hay que entregar; se publicarán notificaciones en el foro antes de cada clase.</li>
                <li>El ‘F’ es el curso CC6909: Trabajo de Título (antiguamente tenía el código CC69F); en el “F” hay que realizar el trabajo planteado anteriormente y entregar el informe final de la memoria.</li>
              </ul>
            </Panel>
            <Panel header="¿Hay algunas restricciones sobre la propiedad intelectual del trabajo?" key="5" extra={[
              <Text><FontAwesomeIcon icon={faClock}/> Hace 5 minutos</Text>
            ]}>
            <ul>
                <li>El ‘E’ es el curso CC6908: Introducción al Trabajo de Título (antiguamente tenía el código CC69E); en el “E” hay que encontrar un tema, escribir una propuesta, y escribir un informe final con un avance en el trabajo. Tipicamente hay dos clases presenciales asociados con el “E” en las cuales se explicarán el proceso de titulación y los informes que hay que entregar; se publicarán notificaciones en el foro antes de cada clase.</li>
                <li>El ‘F’ es el curso CC6909: Trabajo de Título (antiguamente tenía el código CC69F); en el “F” hay que realizar el trabajo planteado anteriormente y entregar el informe final de la memoria.</li>
              </ul>
            </Panel>
          </Collapse>
          </Col>
          
          </Row>
          
        </Card>
      </div>

      <Footer>
        <Row>
          <Col span={4}/>
          <Col span={4}>
            <FontAwesomeIcon icon={faQuestionCircle} size="9x" color="#757575"/>
          </Col>
          <Col span={12}>
            <Row>
              <Title level={2}>¿Sigues con dudas?</Title>
              <Text>
                Contactanos a través de nuestro canal de Telegram o mediante nuestro formulario de contacto

              </Text>

            </Row>
          </Col>
          <Col span={4}/>
        </Row>
        <Row justify={"center"}>DCC 2020 - Protegido bajo licencia Creative Commons</Row>
      </Footer>
    </>
  );
}

export default HomePage;
