import React, {Component} from 'react';
import FAQApi from '../../../api/faqRepository';
import { Typography, Collapse, Spin, Space, notification, Tooltip } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faBriefcase, faRocket, faClock, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import { LoadingOutlined } from '@ant-design/icons';
import VoteComponent from './VoteComponent';
const { Title } = Typography;
const { Panel } = Collapse;

class FAQPublicProcess extends Component {
  constructor(props){
    super(props);
    this.state={
      faqs:null,
    }
  }

  componentDidMount(){
    FAQApi.getFaqByProcessPublished(this.props.id)
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
        <Title level={3}>Preguntas frecuentes</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Collapse expandIconPosition={'right'}>
            {this.state.faqs.map((faq) => {
              return (
                <Panel 
                  header={faq.question}
                  key={faq.created_at}
                  extra={[
                    <Space >
                      <FontAwesomeIcon icon={faClock}/>
                      <Tooltip title={moment(faq.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(faq.created_at).fromNow()}</span>
                      </Tooltip>
                    </Space>
                  ]}>
                  <div>
                    <div dangerouslySetInnerHTML={{__html: faq.answer}} />
                    <VoteComponent {...this.props} id_question={faq.id}/>
                  </div>
                </Panel>
              );
            })}
          </Collapse>
        </Space>
      </div>
    );
  }
}

export default FAQPublicProcess;