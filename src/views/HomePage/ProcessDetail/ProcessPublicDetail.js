import React, {Component} from 'react';
import { Typography } from 'antd';
const { Title } = Typography;

class ProcessPublicDetail extends Component {

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