import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './HomeLayout.css';
import { Layout, Menu, Avatar, Button, PageHeader, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faEnvelope, faSignOutAlt, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

import { UserOutlined } from '@ant-design/icons';
import AuthApi from '../../../api/authRepository';

const { Content, Sider } = Layout;

class HomeLayout extends Component {

  handleClick = e => {
    this.props.children.props.history.push(e.key);
  };

  render(){
    return (
      <Layout key="layout" style={{minHeight: '100vh'}}>
        <PageHeader
            className="site-page-header"
            title="Mesa de Ayuda DCC"
            extra={[
              <FontAwesomeIcon icon={faEnvelopeSquare} size="2x"/>,
            ]}
        />

        {this.props.children}
      </Layout>
    );
  }
}

export default HomeLayout;
