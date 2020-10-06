import React, {Component} from 'react';
import 'antd/dist/antd.css';
import ProcessApi from '../../../api/processRepository';
import { Layout, Menu, Avatar, Button, PageHeader, notification, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faEnvelope, faSignOutAlt, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { LoadingOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import AuthApi from '../../../api/authRepository';

const { Content, Sider } = Layout;

class CategoriesMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      process: null,
    };
  }

  componentDidMount(){
    ProcessApi.getProcessPublished()
      .then(response => {
        this.setState({process: response});
        console.log(this.state);
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente los procesos'});
    });
  }

  handleClick = e => {
    console.log(e.key);
  };

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
      <Layout key="layout" style={{minHeight: '100vh'}}>
        <PageHeader
            className="site-page-header"
            title="Mesa de Ayuda DCC"
            extra={[
              <FontAwesomeIcon icon={faEnvelopeSquare} size="2x"/>,
            ]}
        />

        <Layout key="menu" className="site-layout-sub-header-background">
        <Sider key="sider">
          <Menu
            key="submenu"
            onClick={this.handleClick}
            mode="inline"
            defaultSelectedKeys={[`${this.state.process[0].id}`]}
            style={{ height: '100%', borderRight: 0, backgroundColor: '#f0f4f6'}}
          >
            {this.state.process.map((process) => {
              return (<Menu.Item icon={<FontAwesomeIcon icon={faBriefcase}/>} key={process.id}> {process.name}</Menu.Item>)
            })}
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

export default CategoriesMenu;
