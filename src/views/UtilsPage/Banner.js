import React from 'react';
import 'antd/dist/antd.css';
import './Banner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Typography } from 'antd';
import { faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

const { Title, Text } = Typography;

function Banner() {
  return (
    <div class='site-banner'>
          <Row justify='center' align='middle'>

            <Col span={24}>
            <Row justify='center' align='middle'>
              <FontAwesomeIcon icon={faQuestionCircle} size="9x" color="#757575"/>
              </Row>
              <Row justify='center' align='middle'>
                <Title level={2}>¿Sigues con dudas?</Title>
              </Row>
              <Row justify='center' align='middle'> 
                <Text>
                  Contactanos a través de nuestro canal de Telegram en @AyudaDCCbot
                </Text>
              </Row>
            </Col>

          </Row>
        </div>
  );
}

export default Banner;