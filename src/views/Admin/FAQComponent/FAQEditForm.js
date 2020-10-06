import React, {Component} from 'react';
import FAQApi from '../../../api/faqRepository';
import { Modal, Button, Form, Switch, Input, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { faEye } from '@fortawesome/free-solid-svg-icons';


class FAQEditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      question: {
        question: this.props.question,
        answer: this.props.answer,
        published: this.props.published,
        process: this.props.process,
      }
    };
  }

  statusModal = () => {
    this.setState({visible: !this.state.visible});
  };

  changePublished = () => {
    const questionState = this.state.question;
    questionState.published = !this.state.question.published;
    this.setState({question: questionState});
  }

  onFinish = (question) => {
    const questionState = this.state.question;
    questionState.question = question.question === undefined ? this.state.question.question : question.question;
    FAQApi.updateQuestion(this.props.id, questionState)
      .then(() => {
        notification['success']({
          message: 'Perfecto!',
          description:
          'Se ha actualizado la pregunta'});
        this.statusModal();
        this.props.componentDidMount();
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos actulizar correctamente la pregunta'});
    });
  }

  render(){
    return(
      <div>
        <Button icon={<FontAwesomeIcon icon={faEye}/>} type="text" onClick={this.statusModal}/>
        <Modal
          title="Editar pregunta frecuente"
          visible={this.state.visible}
          onCancel={this.statusModal}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={this.onFinish}
          >
            <Form.Item label="Pregunta" name="question">
              <Input placeholder={this.state.question.question} defaultValue={this.state.question.question}/>
            </Form.Item>

            <Form.Item label="Respuesta" name="answer">
              <CKEditor
                editor={ ClassicEditor }
                data={this.state.question.answer}
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
              <Switch onChange={() => this.changePublished()} defaultChecked={this.state.question.published}/>
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

export default FAQEditForm;