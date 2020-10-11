import React, {Component} from 'react';
import FAQApi from '../../../api/faqRepository';
import { Typography, Collapse, Spin, Space, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Panel } = Collapse;

class FAQPublic extends Component {
  constructor(props){
    super(props);
    this.state={
      faqs:null,
    }
  }

  componentDidMount(){
    FAQApi.getFaqByProcess(this.props.id)
      .then(response => {
        this.setState({faqs: response})
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente las preguntas frecuentes'});
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
          <Collapse
            expandIconPosition={'right'}
          >
            {this.state.faqs.map((faq) => {
              return (
                <Panel 
                  header={faq.question}
                  key={faq.created_at}
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

export default FAQPublic;