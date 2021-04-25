import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../HomeLayout/HomeLayout.css';
import ProcessApi from '../../../api/processRepository';
import FooterComponent from '../../UtilsPage/Footer.js';
import Banner from '../../UtilsPage/Banner.js';
import { Row } from 'antd';
import { Layout, Menu, notification, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faUserGraduate, faRocket, faClock, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import { LoadingOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

class CategoriesMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      process: null,
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
        this.setState({process: response});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente los procesos'});
    });
  }

  handleClick = e => {
    window.location.pathname = e.key;
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
        <div class='position'>
          <div class='main-header'>
            <Row justify='center' align='middle'>
              <span onClick={() => {window.location.href='/'}}><b>Mesa de Ayuda DCC</b></span>
            </Row>
            
          </div>
        </div>

        <Layout key="menu" className="site-layout-sub-header-background">
        <Sider key="sider">
          <Menu
            key="submenu"
            onClick={this.handleClick}
            mode="inline"
            defaultSelectedKeys={[`/categorias/${this.props.children.props.match.params.id_process}`]}
            style={{ height: '100%', borderRight: 0, backgroundColor: '#f0f4f6'}}
          >
            {this.state.process.map((process) => {
              return (<Menu.Item icon={<FontAwesomeIcon icon={this.state.icons[process.icon]}/>} key={`/categorias/${process.id}`}> {process.name}</Menu.Item>)
            })}
          </Menu>
        </Sider>
        <Content key="content" style={{ margin: '24px 16px 0'}}>
            {this.props.children}
            <Banner />
          </Content>  
      </Layout>
      
      <FooterComponent />
      </Layout>

    );
  }
}

export default CategoriesMenu;
