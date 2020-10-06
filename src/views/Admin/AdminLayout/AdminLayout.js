import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './AdminLayout.css';
import { Layout, Menu, Avatar, Button, PageHeader, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined } from '@ant-design/icons';
import AuthApi from '../../../api/authRepository';

const { Content, Sider } = Layout;

class AdminLayout extends Component {

  handleClick = e => {
    this.props.children.props.history.push(e.key);
  };

  logout = (e) => {
    e.preventDefault();
    AuthApi.logOut()
    .then(r => {
      this.props.children.props.history.push('/');
    }).catch(e => {
      notification['error']({
        message: 'Error!',
        description:
        'Hubo un error al cerrar sesión, por favor notificalo al administrador'});
    });
  }

  render(){
    return (
      <Layout key="layout" style={{minHeight: '100vh'}}>
        <PageHeader
          key="header"
          className="site-page-header"
          title="Admin Mesa de Ayuda DCC"
          extra={[
            <Avatar key="avatar" icon={<UserOutlined />} />,
            'Pablo Arancibia Barahona',
            <Button key="button" icon={<FontAwesomeIcon icon={faSignOutAlt}/>} type="text" onClick={this.logout} />
          ]}
        />
        <Layout key="menu" className="site-layout-sub-header-background">
          <Sider key="sider">
            <Menu
              key="submenu"
              onClick={this.handleClick}
              mode="inline"
              defaultSelectedKeys={[this.props.children.props.menu]}
              style={{ height: '100%', borderRight: 0, backgroundColor: '#f0f4f6'}}
            >
              <Menu.Item icon={<FontAwesomeIcon icon={faBriefcase}/>} key='/admin/procesos'> Procesos</Menu.Item>
              <Menu.Item icon={<FontAwesomeIcon icon={faEnvelope}/>} key='/admin/mensajes'> Mensajes</Menu.Item>
            </Menu>
          </Sider>  
          <Content key="content" style={{ margin: '24px 16px 0'}}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AdminLayout;
