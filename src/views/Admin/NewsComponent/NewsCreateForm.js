import React, {Component} from 'react';
import InstancesAPI from '../../../api/instancesRepository';
import { Modal, Button, Form, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class NewsCreateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      news: {
        description: '',
        instance: this.props.params.id_instance,
      }
    };
  }

  statusModal = () => {
    this.setState({visible: !this.state.visible});
  };


  onFinish = () => {
    InstancesAPI.postNews(this.state.news)
    .then((r) => {
      notification['success']({
        message: 'Perfecto!',
        description:
        'Novedad Creada Exitosamente'});
      this.props.componentDidMount();
      this.statusModal();
    }).catch(() => {
      notification['error']({
        message: 'Error!',
        description:
        'No hemos crear correctamente la novedad'});
    });

  }

  render(){
    return(
      <div>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.statusModal}>
            Crear nueva novedad
        </Button>
        <Modal
          title="Crear nueva novedad"
          visible={this.state.visible}
          onCancel={this.statusModal}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={this.onFinish}
          >

            <Form.Item label="Descripción" name="description" rules={[
              {required: true, message: 'Por favor ingresa una novedad'},
            ]}>
              <CKEditor
                editor={ ClassicEditor }
                onChange={ ( event, editor ) => {} }
                onBlur={ ( event, editor ) => {
                  const data = editor.getData();
                  const news = this.state.news;
                  news.description = data;
                  this.setState({news: news});
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

export default NewsCreateForm;