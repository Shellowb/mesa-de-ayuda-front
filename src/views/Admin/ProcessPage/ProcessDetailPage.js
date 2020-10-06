import React, {Component} from 'react';
import ProcessApi from '../../../api/processRepository';
import ProcessDetail from './ProcessDetail';
import { Breadcrumb, Spin, Divider, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FAQComponent from '../FAQComponent/FAQComponent';
import InstanceComponent from '../InstanceComponent/InstanceComponent';

class ProcessDatailPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      process: null,
      params: null
    };
  }

  componentDidMount(){
    this.setState({params: this.props.match.params});
    ProcessApi.getProcessById(this.props.match.params.id)
      .then(response => {
        this.setState({process: response})
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente el proceso'});
    });
  }

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
      <div className="site-layout-background" style={{ padding: 24, overflow: 'hidden'}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href='/admin/procesos'>Procesos</a>
          </Breadcrumb.Item>
        <Breadcrumb.Item>{this.state.process.name}</Breadcrumb.Item>
        </Breadcrumb>
        <ProcessDetail {...this.state} componentDidMount={() => this.componentDidMount()}/>
        <Divider/>
        <InstanceComponent {...this.state} componentDidMount={() => this.componentDidMount()}/>
        <Divider/>
        <FAQComponent {...this.state} componentDidMount={() => this.componentDidMount()}/>
      </div>
    );
  }
}

export default ProcessDatailPage;