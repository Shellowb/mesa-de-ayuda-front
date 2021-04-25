import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './AdminLayout.css';
import FooterComponent from '../../UtilsPage/Footer';
import { Layout, Spin, Menu, Avatar, Button, PageHeader, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LoadingOutlined } from '@ant-design/icons';
import AuthApi from '../../../api/authRepository';

const { Content, Sider } = Layout;

class AdminLayout extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount(){
    AuthApi.getUser()
    .then(() => {
      this.setState({user: AuthApi.getLocalUser()});
    }).catch(e => {
      notification['error']({
        message: 'Error!',
        description:
        'Hubo un error al obtener la información del usuario, por favor notificalo al administrador'});
    });
  }

  handleClick = e => {
    this.props.children.props.history.push(e.key);
  };

  logout = (e) => {
    e.preventDefault();
    AuthApi.logOut()
    .then(() => {
      this.props.children.props.history.push('/');
    }).catch(e => {
      notification['error']({
        message: 'Error!',
        description:
        'Hubo un error al cerrar sesión, por favor notificalo al administrador'});
    });
  }

  render(){
    if(this.state.user == null){
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }

    return (
      <Layout key="layout" style={{minHeight: '100vh'}}>
        <PageHeader
          key="header"
          className="site-page-header"
          title="Admin Mesa de Ayuda DCC"
          extra={[
            <Avatar key="avatar">{this.state.user.first_name[0]}</Avatar>,
            `${this.state.user.first_name} ${this.state.user.last_name}`,
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
        <FooterComponent />
      </Layout>
    );
  }
}

export default AdminLayout;
