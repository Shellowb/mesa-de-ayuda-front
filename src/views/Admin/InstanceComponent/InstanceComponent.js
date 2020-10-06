import React, {Component} from 'react';
import moment from 'moment';
import InstancesAPI from '../../../api/instancesRepository';
import InstanceCreateForm from './InstanceCreateForm';
import { Row, Space, Table, Switch, Button, Typography, Tooltip, Popconfirm, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const { Column } = Table;
const { Title } = Typography;

class InstanceComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      instances: null
    };
  }

  componentDidMount(){
    InstancesAPI.getInstancesByProcess(this.props.params.id)
      .then(response => {
        this.setState({instances: response})
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente la instancia'});
    });
  }

  confirmDelete(id) {
    InstancesAPI.deleteInstance(id)
      .then(() => {
        this.componentDidMount();
        notification['success']({
          message: 'Excelente!',
          description:
          'Se ha eliminado la instancia'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos eliminar correctamente instancia'});
    });
  }

  updatePublished(id, published) {
    InstancesAPI.updatePublished(id, published=!published)
      .then(() => {
        this.componentDidMount();
        notification['success']({
          message: 'Excelente!',
          description:
          'Se ha cambiado el estado de la instancia'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos actulizar correctamente la instancia'});
    });
  }

  render(){
    return(
      <div>
        <Title level={3}>Instancias</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <InstanceCreateForm {...this.props} componentDidMount={() => this.componentDidMount()}/>
          
          <Table dataSource={this.state.instances} >
            <Column title="Instancia" dataIndex="name" key="name" />
            <Column title="Fecha de Creación" dataIndex="created_at" key="created_at" 
              render={(date) => (
                <span>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</span>
              )}
            />
            <Column title="Última Actualización" dataIndex="last_update" key="last_update"
              render={(date) => (
                <Tooltip title={moment(date).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment(date).fromNow()}</span>
                </Tooltip>
              )}
            />
            <Column title="Publicado" dataIndex={["published","id"]}
              render={(published, instance) => (
                <Popconfirm
                    placement="topRight"
                    title="¿Estas seguro que quieres cambiar el estado de esta instancia?"
                    onConfirm={() => {this.updatePublished(instance.id, instance.published)}}
                    okText="Si"
                    cancelText="No"
                >
                  <Switch checked={instance.published}/>
                </Popconfirm>
              )}
            />
            <Column title="Acciones" dataIndex="id"
              render={(id) => (
                <Row>
                  <Button icon={<FontAwesomeIcon icon={faEye}/>} type="text" href={`/admin/procesos/${this.props.params.id}/instancia/${id}`}/>
                  <Popconfirm
                    placement="topRight"
                    title="¿Estas seguro que quieres eliminar esta instancia?"
                    onConfirm={() => {this.confirmDelete(id)}}
                    okText="Si"
                    cancelText="No"
                  >
                    <Button icon={<FontAwesomeIcon icon={faTrash}/>} type="text" />
                  </Popconfirm>
                </Row>
              )}
            />
          </Table>
        </Space>

      </div>
    );
  }
}

export default InstanceComponent;