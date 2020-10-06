import React, {Component} from 'react';
import moment from 'moment';
import InstanceApi from '../../../api/instancesRepository';
import { Modal, Button, Form, Input, notification, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { faEye } from '@fortawesome/free-solid-svg-icons';

class TimelineEditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      step: {
        name: this.props.name,
        description: this.props.description,
        start_date: this.props.start_date,
        instance: this.props.instance,
      }
    };
  }

  statusModal = () => {
    this.setState({visible: !this.state.visible});
  };


  onFinish = (step) => {
    step.name = step.name === undefined ? this.state.step.name : step.name;
    step.description = this.state.step.description;
    step.instance = this.state.step.instance;
    step.start_date = step.start_date === undefined ? this.state.step.start_date : step.start_date.toISOString();
    step.end_date = step.end_date === undefined ? null : step.end_date.toISOString();
    
    InstanceApi.updateStep(this.props.id, step)
    .then(() => {
      notification['success']({
        message: 'Perfecto!',
        description:
        'Fecha Actualizada Exitosamente'});
      this.props.componentDidMount();
      this.statusModal();
    }).catch(() => {
      notification['error']({
        message: 'Error!',
        description:
        'No hemos actulizar correctamente la fecha'});
    });
  }

  render(){
    return(
      <div>
        <Button icon={<FontAwesomeIcon icon={faEye}/>} type="text" onClick={this.statusModal}/>
        <Modal
          title="Editar Fecha"
          visible={this.state.visible}
          onCancel={this.statusModal}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={this.onFinish}
          >
            <Form.Item label="Nombre" name="name" >
              <Input placeholder={this.props.name} defaultValue={this.props.name}/>
            </Form.Item>

            <Form.Item label="Inicio" name="start_date" >
              <DatePicker defaultValue={moment(this.props.start_date)}/>
            </Form.Item>
            
            <Form.Item label="Termino (Opcional)" name="end_date">
              <DatePicker  />
            </Form.Item>

            <Form.Item label="Descripción (Opcional)" name="description" >
              <CKEditor
                data={this.state.step.description}
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
              <Button type="primary" htmlType="submit">Guardar</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default TimelineEditForm;