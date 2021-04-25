import React, {Component} from 'react';
import moment from 'moment';
import InstanceApi from '../../../api/instancesRepository';
import { Typography, Timeline, Spin, Space, notification, Calendar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Text } = Typography;

class TimelinePublicComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      params: this.props.params,
      steps: null,
      list: true
    }
  }

  componentDidMount(){
    InstanceApi.getSteps(this.props.params.id_instance)
      .then(response => {
        this.setState({steps: response});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente las fechas'});
    });
  }

  confirmDelete(id) {
    InstanceApi.deleteStep(id)
      .then(() => {
        this.componentDidMount();
        notification['success']({
          message: 'Excelente!',
          description:
          'Se ha eliminado la fecha'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos eliminar correctamente la fecha'});
    });
  }

  list(){
    return (
      <Timeline>
        {this.state.steps.map((step) => {
          return (
            <Timeline.Item>
              <Space direction='vertical'>
                  <Text>
                    {moment(step.start_date).format('DD/MM/YYYY')} 
                    {step.end_date ? ` - ${moment(step.end_date).format('DD/MM/YYYY')}`: '' }
                  </Text>
                <Text strong>{step.name}</Text>
                <div dangerouslySetInnerHTML={{__html: step.description}} />
              </Space>
            </Timeline.Item>
          );
        })}
      </Timeline>
    )
  }

  onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  grid(){
    return (
      <Calendar onPanelChange={this.onPanelChange} />
    )
  }

  render(){
    if(this.state.steps == null){
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }
    return (
      <div style={{paddingTop: '1%'}}>
        <Space direction='vertical'>
          <br/>
          {this.state.list ? this.list() : this.grid}
        </Space>
      </div>
    );
  }
}

export default TimelinePublicComponent;