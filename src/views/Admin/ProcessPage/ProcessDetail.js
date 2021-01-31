import React, {Component} from 'react';
import ProcessApi from '../../../api/processRepository';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, Form, Input, Button, Switch, Space, Row, Col, Popconfirm, notification, Select } from 'antd';
import { faUserGraduate, faBriefcase, faRocket, faClock, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { Title } = Typography;
const { Option } = Select;

class ProcessDatail extends Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      description: '',
      banner_description: '',
      icon: this.props.process.icon,
      icons: {
        'faUserGraduate': faUserGraduate,
        'faBriefcase': faBriefcase,
        'faRocket': faRocket,
        'faClock': faClock,
        'faQuestionCircle': faQuestionCircle
      }
    };
  }

  changeIcon = (value) => {
    this.setState({icon: value});
  }

  onFinish = (process) => {
    const params = {
      name: process.name !== undefined? process.name : this.props.process.name,
      description: process.description !== undefined? this.state.description : this.props.process.description,
      banner_description: process.banner_description !== undefined? this.state.banner_description : this.props.process.banner_description,
      icon: this.state.icon,
      published: process.published !== undefined? process.published : this.props.process.published,
    }
    ProcessApi.updateProcess(this.props.process.id, params)
      .then(() => {
        this.props.componentDidMount();
        notification['success']({
          message: 'Perfecto!',
          description:
          'Se ha actualizado el proceso'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos actulizar correctamente el proceso'});
    });
    this.setState({edit: false});
  }

  updatePublished(id, published) {
    ProcessApi.updatePublished(id, !published)
      .then(() => {
        this.props.componentDidMount();
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

  edit(){
    return (
      <div>
        <br/>
      <Form
        layout="vertical"
        onFinish={this.onFinish}
      >
        <Row >
          <Col span={22} >
            <Space width='100%' size='large' align="center">
              <Form.Item  name="name">
                <Input placeholder={this.props.process.name} defaultValue={this.props.process.name} bordered={false} style={{
                  fontSize:'32px', textDecorationLine: 'underline', color:'gray'}}/>
              </Form.Item>
              <Form.Item name="published">
                <Switch checkedChildren="Publicado" unCheckedChildren="Oculto" defaultChecked={this.props.process.published}/>
              </Form.Item>
            </Space>
          </Col>
          <Col span={2}  style={{display: 'flex', alignContent: 'center'}}>
            <Space width='100%' size='large' >
              <Form.Item>
                <Button type="primary" danger htmlType="submit">Guardar</Button>
              </Form.Item>
            </Space>
          
          </Col>
        </Row>

        <Form.Item label="Icono" name="icon" rules={[
              {required: true, message: 'Por favor ingresa un icono'},
            ]}>
              <Select defaultValue={this.state.icon} style={{ width: 120 }} onChange={this.changeIcon}>
                {Object.keys(this.state.icons).map((key) => {
                  return (<Option value={key}><FontAwesomeIcon icon={this.state.icons[key]} color="#757575"/></Option>)
                })}
              </Select>
        </Form.Item>

        <Form.Item label='Descripción'  name="description">
          <CKEditor
            editor={ ClassicEditor }
            onChange={ ( event, editor ) => {} }
            onBlur={ ( event, editor ) => {
              const data = editor.getData();
              this.setState({description: data});
            } }
            onFocus={ ( event, editor ) => {} }
            data={this.props.process.description}
          />
        </Form.Item>

        <Form.Item label='Descripción de banner' name="banner_description">
          <CKEditor
            editor={ ClassicEditor }
            onChange={ ( event, editor ) => {} }
            onBlur={ ( event, editor ) => {
              const data = editor.getData();
              this.setState({banner_description: data});
            } }
            onFocus={ ( event, editor ) => {} }
            data={this.props.process.banner_description}
          />
        </Form.Item>
      </Form>
      </div>
    )
  }

  detail(){
    return (
      <div>
        <Row >
          <Col span={22} style={{display: 'flex', alignContent: 'center'}}>
            <Space width='100%' size='large'>
            <FontAwesomeIcon icon={this.state.icons[this.state.icon]} size="2x"/>
              <Title>{this.props.process.name}</Title>
              <Popconfirm
                placement="topRight"
                title="¿Estas seguro que quieres cambiar el estado de este proceso?"
                onConfirm={() => {this.updatePublished(this.props.process.id, this.props.process.published)}}
                okText="Si"
                cancelText="No"
              >
                <Switch checkedChildren="Publicado" unCheckedChildren="Oculto" checked={this.props.process.published}/>
              </Popconfirm>
            </Space>
          </Col>
          <Col span={2}  style={{display: 'flex', alignContent: 'center'}}>
            <Space width='100%' size='large' >
              <Form.Item>
                <Button type="primary" onClick={() => this.setState({edit: true})}>Editar</Button>
              </Form.Item>
            </Space>
          
          </Col>
        </Row>
        <div dangerouslySetInnerHTML={{__html: this.props.process.description}} />
        <br/>
        <div dangerouslySetInnerHTML={{__html: '<b>Descripción de Banner: </b>' + this.props.process.banner_description}} />
      </div>
    )
  }

  render(){
    return this.state.edit ? this.edit() : this.detail();
  }
}

export default ProcessDatail;