import React, {Component} from 'react';
import InstanceApi from '../../../api/instancesRepository';
import ProcessApi from '../../../api/processRepository';
import InstanceDatail from './InstanceDetail';
import TimelineComponent from '../TimelineComponent/TimelineComponent';
import NewsComponent from '../NewsComponent/NewsComponent';
import { Breadcrumb, Spin, Menu, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

class InstanceDatailPage extends Component {
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
    InstanceApi.getInstanceById(this.props.match.params.id_instance)
      .then(response => {
        this.setState({instance: response})
        ProcessApi.getProcessById(this.props.match.params.id_process)
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
            <a href='/admin/procesos'>Procesos</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href={`/admin/procesos/${this.props.match.params.id_process}`}>{this.state.process.name}</a>
          </Breadcrumb.Item>
        <Breadcrumb.Item>{this.state.instance.name}</Breadcrumb.Item>
        </Breadcrumb>
        <InstanceDatail {...this.state} componentDidMount={() => this.componentDidMount()}/>
        <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
          <Menu.Item key="news">
            Últimas novedades
          </Menu.Item>
          <Menu.Item key="dates">
            Fechas Importantes
          </Menu.Item>

        </Menu>
        {this.state.current === 'dates' ?
          <TimelineComponent {...this.state} componentDidMount={() => this.componentDidMount()}/> :
          <NewsComponent {...this.state} componentDidMount={() => this.componentDidMount()}/>
        }
      </div>
    );
  }
}

export default InstanceDatailPage;