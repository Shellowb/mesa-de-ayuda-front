import React, {Component} from 'react';
import ProcessApi from '../../../api/processRepository';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Input, Form, Switch, Button, notification } from 'antd';

class ProcessForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      published: false
    };
  }

  changePublished = (checked) => {
    this.setState({published: checked});
  }

  onFinish = (process) => {
    this.setState({name: process.name});
    ProcessApi.postProcess(this.state)
    .then(r => {
      notification['success']({
        message: 'Perfecto!',
        description:
        'Proceso Creado Exitosamente'});
      this.props.history.push('/admin/procesos');
    }).catch(() => {
      notification['error']({
        message: 'Error!',
        description:
        'No hemos crear correctamente el proceso'});
    });
  }

  render(){
    return (
      <Form
        layout="vertical"
        onFinish={this.onFinish}
      >
        <Form.Item label="Nombre del proceso" name="name" rules={[
          {required: true, message: 'Por favor ingresa un nombre de proceso'},
        ]}>
          <Input placeholder="e.g. Proceso de titulación" />
        </Form.Item>

        <Form.Item label="Descripción" name="description" rules={[
          {required: true, message: 'Por favor ingresa una descripción'},
        ]}>
          <CKEditor
            editor={ ClassicEditor }
            onChange={ ( event, editor ) => {} }
            onBlur={ ( event, editor ) => {
              const data = editor.getData();
              this.setState({description: data});
            } }
            onFocus={ ( event, editor ) => {} }
          />
        </Form.Item>

        <Form.Item label="Publicar" name="published">
          <Switch onChange={ this.changePublished }/>
        </Form.Item>

        <Form.Item>
        <Button type="primary" htmlType="submit">Crear</Button>
        </Form.Item>
      </Form>
    );
  }
  
};

export default ProcessForm;