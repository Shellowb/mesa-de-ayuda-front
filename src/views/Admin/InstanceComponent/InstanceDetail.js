import React, {Component} from 'react';
import InstanceApi from '../../../api/instancesRepository';
import { Typography, Form, Input, Button, Switch, Space, Row, Col, Popconfirm, notification } from 'antd';
const { Title } = Typography;

class InstanceDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
    };
  }

  onFinish = (instance) => {
    const params = {
      name: instance.name !== undefined? instance.name : this.props.instance.name,
      published: instance.published !== undefined? instance.published : this.props.instance.published,
    }
    InstanceApi.updateInstance(this.props.instance.id, params)
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
          'No hemos actulizar correctamente la instancia'});
    });
    this.setState({edit: false});
  }

  updatePublished(id, published) {
    InstanceApi.updatePublished(id, !published)
      .then(() => {
        this.props.componentDidMount();
        notification['success']({
          message: 'Excelente!',
          description:
          'Se ha cambiado el estado de la instancia'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos actulizar correctamente la instancia'});
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
          <Col span={21} >
            <Space width='100%' size='large' align="center">
              <Form.Item  name="name">
                <Input placeholder={this.props.instance.name} defaultValue={this.props.instance.name} bordered={false} style={{
                  fontSize:'24px', textDecorationLine: 'underline', color:'gray'}}/>
              </Form.Item>
              <Form.Item name="published">
                <Switch checkedChildren="Publicado" unCheckedChildren="Oculto" defaultChecked={this.props.instance.published}/>
              </Form.Item>
            </Space>
          </Col>
          <Col span={3}  style={{display: 'flex', alignContent: 'center'}}>
            <Space width='100%' size='large' >
              <Form.Item>
                <Button type="primary" danger htmlType="submit">Guardar</Button>
              </Form.Item>
            </Space>
          
          </Col>
        </Row>
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
              <Title level={2}>{this.props.instance.name}</Title>
              <Popconfirm
                placement="topRight"
                title="¿Estas seguro que quieres cambiar el estado de este proceso?"
                onConfirm={() => {this.updatePublished(this.props.instance.id, this.props.instance.published)}}
                okText="Si"
                cancelText="No"
              >
                <Switch checkedChildren="Publicado" unCheckedChildren="Oculto" checked={this.props.instance.published}/>
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
      </div>
    )
  }

  render(){
    return this.state.edit ? this.edit() : this.detail();
  }
}

export default InstanceDetail;