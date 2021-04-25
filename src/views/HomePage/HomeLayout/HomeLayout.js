import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './HomeLayout.css';
import { Layout } from 'antd';
import { Row } from 'antd';

class HomeLayout extends Component {

  handleClick = e => {
    this.props.children.props.history.push(e.key);
  };

  render(){
    return (
      <Layout key="layout" style={{minHeight: '100vh'}}>
        <div class='position'>
          <div class='main-header'>
            <Row justify='center' align='middle'>
              <b>Mesa de Ayuda DCC</b>
            </Row>
            
          </div>
        </div>

        {this.props.children}
      </Layout>
    );
  }
}

export default HomeLayout;
