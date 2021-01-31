import React, {Component} from 'react';
import ProcessApi from '../../../api/processRepository';
import CKEditor from '@ckeditor/ckeditor5-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { faUserGraduate, faBriefcase, faRocket, faClock, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import { Input, Form, Switch, Button, notification, Divider, Typography, Row, Col, Card, Select } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

class ProcessForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Nombre Proceso',
      description: '',
      banner_description: 'Descripción proceso',
      published: false,
      icon: 'faUserGraduate',
      icons: {
        'faUserGraduate': faUserGraduate,
        'faBriefcase': faBriefcase,
        'faRocket': faRocket,
        'faClock': faClock,
        'faQuestionCircle': faQuestionCircle
      }
    };
  }

  changePublished = (checked) => {
    this.setState({published: checked});
  }

  onFinish = (process) => {
    const params = {
      name: process.name,
      description: this.state.description,
      banner_description: this.state.banner_description,
      icon: this.state.icon,
      published: this.state.published,
    };
    console.log(params);
    ProcessApi.postProcess(params)
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

  changeName = (e) => {
    this.setState({name: e.target.value});
  }

  changeIcon = (value) => {
    this.setState({icon: value});
  }

  render(){
    return (
      <Form
        layout="vertical"
        onFinish={this.onFinish}
      >
        <Form.Item label="Nombre del proceso" name="name" onChange={this.changeName} rules={[
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

        <Divider/>
        <Title level={3}>Configuración de Banner</Title>
        <Row gutter={[16, 16]}>
          <Col xs={{span: 24}} md={{span: 12}} lg={{span: 12}} xl={{span: 18}}>
            <Form.Item label="Descripción en Banner" name="banner_description" rules={[
              {required: true, message: 'Por favor ingresa una descripción'},
            ]}>
              <CKEditor
                editor={ ClassicEditor }
                onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  this.setState({banner_description: data});
                } }
                onBlur={ ( event, editor ) => {
                  const data = editor.getData();
                  this.setState({banner_description: data});
                } }
                onFocus={ ( event, editor ) => {} }
              />
            </Form.Item>
            <Form.Item label="Icono" name="icon" rules={[
              {required: true, message: 'Por favor ingresa un icono'},
            ]}>
              <Select defaultValue='faUserGraduate' style={{ width: 120 }} onChange={this.changeIcon}>
                {Object.keys(this.state.icons).map((key) => {
                  return (<Option value={key}><FontAwesomeIcon icon={this.state.icons[key]} color="#757575"/></Option>)
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{span: 24}} md={{span: 12}} lg={{span: 12}} xl={{span: 6}}>
            <Text>Preview</Text>
            <Card 
              style={{ 
                borderRadius: '11px',
                backgroundColor: '#F3F6F7',
                border: 0,
                textAlign:"center",
                height:'100%',
              }}
            >
              <FontAwesomeIcon icon={this.state.icons[this.state.icon]} size="2x" color="#757575"/>
              <p/>
              <Title level={4}>{this.state.name}</Title>
              <div dangerouslySetInnerHTML={{__html: this.state.banner_description}} />
              <Text strong>+info</Text>
            </Card>
          </Col>
        </Row>


        <Form.Item>
        <Button type="primary" htmlType="submit">Crear</Button>
        </Form.Item>
      </Form>
    );
  }
  
};

export default ProcessForm;