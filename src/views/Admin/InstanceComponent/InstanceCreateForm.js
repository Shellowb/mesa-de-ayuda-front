import React, {Component} from 'react';
import InstancesAPI from '../../../api/instancesRepository';
import { Modal, Button, Form, Switch, Input, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

class InstanceCreateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      instance: {
        name: '',
        published: false,
        process: this.props.params.id,
      }
    };
  }

  statusModal = () => {
    this.setState({visible: !this.state.visible});
  };

  changePublished = (checked) => {
    const instanceState = this.state.instance;
    instanceState.published = checked;
    this.setState({instance: instanceState});
  }

  onFinish = (instance) => {
    const instanceState = this.state.instance;
    instanceState.name = instance.name;
    this.setState({instance: instanceState});
    InstancesAPI.postInstance(this.state.instance)
    .then((r) => {
      notification['success']({
        message: 'Perfecto!',
        description:
        'Instancia Creada Exitosamente'});
      this.props.componentDidMount();
      this.statusModal();
    }).catch(() => {
      notification['error']({
        message: 'Error!',
        description:
        'No hemos crear correctamente la instancia'});
    });

  }

  render(){
    return(
      <div>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.statusModal}>
            Crear nueva instancia
        </Button>
        <Modal
          title="Crear nueva instancia"
          visible={this.state.visible}
          onCancel={this.statusModal}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={this.onFinish}
          >
            <Form.Item label="Nombre de Instancia" name="name" rules={[
              {required: true, message: 'Por favor ingresa un nombre'},
            ]}>
              <Input placeholder="e.g. Proceso de Titulación primavera 2020" />
            </Form.Item>


            <Form.Item label="Publicar" name="published">
              <Switch onChange={ this.changePublished }/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">Crear</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default InstanceCreateForm;