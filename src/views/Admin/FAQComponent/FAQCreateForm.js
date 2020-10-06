import React, {Component} from 'react';
import FAQApi from '../../../api/faqRepository';
import { Modal, Button, Form, Switch, Input, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class FAQCreateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      question: {
        question: '',
        answer: '',
        published: false,
        process: this.props.params.id,
      }
    };
  }

  statusModal = () => {
    this.setState({visible: !this.state.visible});
  };

  changePublished = (checked) => {
    const questionState = this.state.question;
    questionState.published = checked;
    this.setState({question: questionState});
  }

  onFinish = (question) => {
    const questionState = this.state.question;
    questionState.question = question.question;
    this.setState({question: questionState});
    FAQApi.postQuestion(this.state.question)
    .then(() => {
      notification['success']({
        message: 'Perfecto!',
        description:
        'Pregunta Creada Exitosamente'});
      this.props.componentDidMount();
      this.statusModal();
    }).catch(e => {
      notification['error']({
        message: 'Error!',
        description:
        'No hemos crear correctamente la pregunta'});
    });

  }

  render(){
    return(
      <div>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.statusModal}>
            Crear nueva pregunta
        </Button>
        <Modal
          title="Crear nueva pregunta frecuente"
          visible={this.state.visible}
          onCancel={this.statusModal}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={this.onFinish}
          >
            <Form.Item label="Pregunta" name="question" rules={[
              {required: true, message: 'Por favor ingresa una pregunta'},
            ]}>
              <Input placeholder="e.g. ¿Que es el 'E'?" />
            </Form.Item>

            <Form.Item label="Respuesta" name="answer" rules={[
              {required: true, message: 'Por favor ingresa una respuesta'},
            ]}>
              <CKEditor
                editor={ ClassicEditor }
                onChange={ ( event, editor ) => {} }
                onBlur={ ( event, editor ) => {
                  const data = editor.getData();
                  const question = this.state.question;
                  question.answer = data;
                  this.setState({question: question});
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
        </Modal>
      </div>
    );
  }
}

export default FAQCreateForm;