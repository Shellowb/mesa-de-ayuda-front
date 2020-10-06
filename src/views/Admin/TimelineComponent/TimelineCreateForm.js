import React, {Component} from 'react';
import InstanceApi from '../../../api/instancesRepository';
import { Modal, Button, Form, DatePicker, Input, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class TimelineCreateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      step: {
        description: '',
        instance: this.props.params.id_instance,
      }
    };
  }

  statusModal = () => {
    this.setState({visible: !this.state.visible});
  };

  onFinish = (step) => {
    step.description = this.state.step.description;
    step.instance = this.state.step.instance;
    step.start_date = step.start_date.toISOString();
    step.end_date = step.end_date === undefined ? null: step.end_date.toISOString();
    
    InstanceApi.postStep(step)
    .then(() => {
      notification['success']({
        message: 'Perfecto!',
        description:
        'Fecha Creada Exitosamente'});
      this.props.componentDidMount();
      this.statusModal();
    }).catch(() => {
      notification['error']({
        message: 'Error!',
        description:
        'No hemos crear correctamente la fecha'});
    });
  }

  render(){
    return(
      <div>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.statusModal}>
            Crear Fecha
        </Button>
        <Modal
          title="Crear nueva fecha"
          visible={this.state.visible}
          onCancel={this.statusModal}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={this.onFinish}
          >
            <Form.Item label="Nombre" name="name" rules={[
              {required: true, message: 'Por favor ingresa un nombre'},
            ]}>
              <Input placeholder="e.g. Periodo de Postulaciones" />
            </Form.Item>

            <Form.Item label="Inicio" name="start_date" rules={[
              {required: true, message: 'Por favor ingresa una fecha'},
            ]}>
              <DatePicker />
            </Form.Item>
            
            <Form.Item label="Termino (Opcional)" name="end_date">
              <DatePicker  />
            </Form.Item>

            <Form.Item label="Descripción (Opcional)" name="description" >
              <CKEditor
                editor={ ClassicEditor }
                onChange={ ( event, editor ) => {} }
                onBlur={ ( event, editor ) => {
                  const data = editor.getData();
                  const step = this.state.step;
                  step.description = data;
                  this.setState({step: step});
                } }
                onFocus={ ( event, editor ) => {} }
              />
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

export default TimelineCreateForm;