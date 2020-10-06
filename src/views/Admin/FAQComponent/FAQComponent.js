import React, {Component} from 'react';
import FAQApi from '../../../api/faqRepository';
import FAQCreateForm from './FAQCreateForm';
import FAQEditForm from './FAQEditForm';
import { Typography, Collapse, Spin, Button, Space, Popconfirm, notification, Switch, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingOutlined } from '@ant-design/icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const { Title } = Typography;
const { Panel } = Collapse;

class FAQComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      faqs: null
    };
  }

  componentDidMount(){
    FAQApi.getFaqByProcess(this.props.params.id)
      .then(response => {
        this.setState({faqs: response})
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
          <FAQCreateForm {...this.props} componentDidMount={() => this.componentDidMount()}/>
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
                      <FAQEditForm {...faq} componentDidMount={() => this.componentDidMount()}/>
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