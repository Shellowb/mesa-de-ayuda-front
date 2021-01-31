import React, {Component} from 'react';
import FAQApi from '../../../api/faqRepository';
import { Typography, Collapse, Space, notification, Tooltip, Divider } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faBriefcase, faRocket, faClock, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import { LoadingOutlined } from '@ant-design/icons';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
const { Title } = Typography;
const { Panel } = Collapse;

class VoteComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      action: false
    }
  }

  like(){
    this.setState({action: true})
    FAQApi.likeQuestion(this.props.id_question);
  }
  
  dislike(){
    this.setState({action: true})
    FAQApi.dislikeQuestion(this.props.id_question);
  }

  render(){
    if (this.state.action){
      return(
        <div>
          <Divider />
          Gracias por tu feedback :)
        </div>
      );
    }

    return(
      <div>
        <Divider />
        <Space>
          ¿Fue de utilidad esta pregunta? 
          <Tooltip key="comment-basic-like" title="Si">
          <span onClick={() => {this.like()}}>
            {React.createElement(LikeOutlined)}
          </span>
          </Tooltip>

          <Tooltip key="comment-basic-like" title="No">
          <span onClick={() => {this.dislike()}}>
            {React.createElement(DislikeOutlined)}
          </span>
          </Tooltip>
          
        </Space>
        
      </div>
    );
  }
}

export default VoteComponent;