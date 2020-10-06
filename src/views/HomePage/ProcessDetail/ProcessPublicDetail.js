import React, {Component} from 'react';
import ProcessApi from '../../../api/processRepository';
import { Typography, Form, Input, Button, Switch, Space, Row, Col, Popconfirm, notification } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const { Title } = Typography;

class ProcessPublicDetail extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <Title>{this.props.name}</Title>
        <div dangerouslySetInnerHTML={{__html: this.props.description}} />
      </div>
    );
  }
}

export default ProcessPublicDetail;