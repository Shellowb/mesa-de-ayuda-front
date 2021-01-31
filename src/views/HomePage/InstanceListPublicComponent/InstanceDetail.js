import React, {Component} from 'react';
import InstanceApi from '../../../api/instancesRepository';
import ProcessApi from '../../../api/processRepository';
import NewsPublicComponent from '../NewsComponent/NewsPublicComponent';
import TimelinePublicComponent from '../TimelineComponent/TimelinePublicComponent';
import { Breadcrumb, Spin, Menu, notification, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;

class InstancePublicDetailPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 'news',
      instance: null,
      params: null,
      process: null
    };
  }

  componentDidMount(){
    this.setState({params: this.props.match.params});
    InstanceApi.getInstancePublishedById(this.props.match.params.id_instance)
      .then(response => {
        console.log(response);
        this.setState({instance: response})
        ProcessApi.getProcessPublishedById(this.props.match.params.id_process)
          .then(response => {
            this.setState({process: response})
          }).catch(e => {
            notification['error']({
              message: 'Error!',
              description:
              'No hemos cargar correctamente el proceso'});
        });
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente la instancia'});
    });
  }

  handleClick = e => {
    this.setState({ current: e.key });
  };

  render(){
    if(this.state.instance == null || this.state.process == null){
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }
    return (
      <div className="site-layout-background" style={{ padding: 24, overflow: 'hidden'}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href={`/categorias/${this.props.match.params.id_process}`}>{this.state.process.name}</a>
          </Breadcrumb.Item>
        <Breadcrumb.Item>{this.state.instance.name}</Breadcrumb.Item>
        </Breadcrumb>
       <Title>{this.state.instance.name}</Title>
        <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
          <Menu.Item key="news">
            Últimas novedades
          </Menu.Item>
          <Menu.Item key="dates">
            Fechas Importantes
          </Menu.Item>

        </Menu>
        {this.state.current === 'dates' ?
          <TimelinePublicComponent {...this.state} componentDidMount={() => this.componentDidMount()}/> :
          <NewsPublicComponent {...this.state} componentDidMount={() => this.componentDidMount()}/>
        }
      </div>
    );
  }
}

export default InstancePublicDetailPage;