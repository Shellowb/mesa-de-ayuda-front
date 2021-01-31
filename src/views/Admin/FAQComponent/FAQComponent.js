import React, {Component} from 'react';
import moment from 'moment';
import FAQApi from '../../../api/faqRepository';
import CategoryApi from '../../../api/categoryRepository';
import FAQCreateForm from './FAQCreateForm';
import CategoryComponent from '../CategoryComponent/CategoryComponent.js'
import FAQEditForm from './FAQEditForm';
import { Typography, Tooltip, Collapse, Spin, Button, Space, Popconfirm, notification, Switch, Divider, Tag } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingOutlined } from '@ant-design/icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const { Title } = Typography;
const { Panel } = Collapse;

class FAQComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      faqs: null,
      categories: null,
    };
  }

  componentDidMount(){
    FAQApi.getFaqByProcess(this.props.params.id)
      .then(response => {
        this.setState({faqs: response});
        CategoryApi.getCategoriesByProcess(this.props.params.id)
          .then(response => {
            this.setState({categories: response})
          }).catch(e => {
            notification['error']({
              message: 'Error!',
              description:
              'No hemos cargar correctamente las las categorias'});
        });
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente las preguntas frecuentes'});
    });
  }

  updatePublished(id, published) {
    FAQApi.updatePublished(id, published)
      .then(() => {
        this.componentDidMount();
        notification['success']({
          message: 'Excelente!',
          description:
          'Se ha actualizado la pregunta'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos actulizar correctamente la pregunta'});
    });
  }

  confirmDelete(id) {
    FAQApi.deleteQuestion(id)
      .then(() => {
        this.componentDidMount();
        notification['success']({
          message: 'Excelente!',
          description:
          'Se ha eliminado la pregunta'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos eliminar correctamente pregunta'});
    });
  }

  render(){
    if(this.state.faqs == null){
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }

    return(
      <div>
        <Title level={3}>Preguntas Frecuentes</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <CategoryComponent {...this.props} componentDidMount={() => this.componentDidMount()}/>
          <Divider />
          <Title level={5}>Preguntas</Title>
          <FAQCreateForm {...this.props} componentDidMount={() => this.componentDidMount()} categories={this.state.categories}/>
          <Collapse
            expandIconPosition={'right'}
          >
            {this.state.faqs.map((faq) => {
              return (
                <Panel 
                  header={faq.question}
                  key={faq.created_at}
                  extra={[
                    <Space align="center">
                      <Tag color="volcano">{faq.category.name}</Tag>
                      <Divider type="vertical" />
                        {React.createElement(LikeOutlined)}
                        {faq.likes}
                        {React.createElement(DislikeOutlined)}
                        {faq.dislikes}
                      <Divider type="vertical" />
                        Actualizado por: {faq.updated_by.first_name}{faq.updated_by.last_name}
                      <Divider type="vertical" />
                      <Popconfirm
                          placement="topRight"
                          title="¿Estas seguro que quieres cambiar el estado de esta pregunta?"
                          onConfirm={() => {this.updatePublished(faq.id, !faq.published)}}
                          okText="Si"
                          cancelText="No"
                      >
                        <Switch checked={faq.published}/>
                      </Popconfirm>
                      <Divider type="vertical" />
                      <FAQEditForm {...faq} componentDidMount={() => this.componentDidMount()} categories={this.state.categories}/>
                      <Popconfirm
                        placement="topRight"
                        title="¿Estas seguro que quieres eliminar esta pregunta?"
                        onConfirm={() => {this.confirmDelete(faq.id)}}
                        okText="Si"
                        cancelText="No"
                      >
                        <Button icon={<FontAwesomeIcon icon={faTrash}/>} type="text" />
                      </Popconfirm>
                    </Space>
                  ]}
                >
                  <div dangerouslySetInnerHTML={{__html: faq.answer}} />
                </Panel>
              );
            })}
          </Collapse>
        </Space>
      </div>
    );
  }
}

export default FAQComponent;