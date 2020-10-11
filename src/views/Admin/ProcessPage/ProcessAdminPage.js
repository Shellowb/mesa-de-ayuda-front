import React, {Component} from 'react';
import moment from 'moment';
import ProcessApi from '../../../api/processRepository';
import { Row, Space, Table, Switch, Button, Typography, Divider, Popconfirm, notification, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Column } = Table;

class ProcessAdminPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      disabled: false,
    };
  }

  componentDidMount(){
    ProcessApi.getProcess()
      .then(response => {
        this.setState({process: response})
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente los procesos'});
    });
  }

  confirmDelete(id) {
    ProcessApi.deleteProcess(id)
      .then(() => {
        this.componentDidMount();
        notification['success']({
          message: 'Excelente!',
          description:
          'Se ha eliminado el proceso'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos eliminar correctamente el proceso'});
    });
  }

  updatePublished(id, published) {
    ProcessApi.updatePublished(id, published=!published)
      .then(() => {
        this.componentDidMount();
        notification['success']({
          message: 'Excelente!',
          description:
          'Se ha cambiado el estado del proceso'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos actulizar correctamente el proceso'});
    });
  }

  render(){
    return (
      <div key="content" className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title key="title" >Procesos</Title>
        <Paragraph key="paragraph">
          En esta sección puede agregar procesos y tambien editar el estado de los procesos actuales relacionados con el departamento de Ciencias de la Computación de la Universidad de Chile.
        </Paragraph>
        <Divider key="divider"/>
        <Space key="space" direction="vertical" style={{ width: '100%' }}>
          <Button key="button" type="primary" color="#ffff" icon={<PlusCircleOutlined />} href='/admin/procesos/crear'>
            Crear nuevo proceso
          </Button>
          
          <Table key="procesos" dataSource={this.state.process} >
            <Column title="Proceso" dataIndex="name" key="name" />
            <Column title="Fecha de Creación" dataIndex="created_at" key="created_at"
              render={(date) => (
                <span key="date">{moment(date).format('YYYY-MM-DD HH:mm:ss')}</span>
              )}
            />
            <Column title="Última Actualización" dataIndex="last_update" key="last_update"
              render={(date) => (
                <Tooltip key="tooltip" title={moment(date).format('YYYY-MM-DD HH:mm:ss')}>
                  <span key="date" >{moment(date).fromNow()}</span>
                </Tooltip>
              )}
            />
            <Column title="Publicado" dataIndex={["published","id"]} key="published"
              render={(published, process) => (
                <Popconfirm
                    key="popconfirm"
                    placement="topRight"
                    title="¿Estas seguro que quieres cambiar el estado de este proceso?"
                    onConfirm={() => {this.updatePublished(process.id, process.published)}}
                    okText="Si"
                    cancelText="No"
                >
                  <Switch key="switch" checked={process.published}/>
                </Popconfirm>
              )}
            />
            <Column title="Acciones" dataIndex="id"
              render={(id) => (
                <Row key="row">
                  <Button icon={<FontAwesomeIcon icon={faEye}/>} type="text" href={`/admin/procesos/${id}`}/>
                  <Popconfirm
                    placement="topRight"
                    title="¿Estas seguro que quieres eliminar este proceso?"
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

export default ProcessAdminPage;