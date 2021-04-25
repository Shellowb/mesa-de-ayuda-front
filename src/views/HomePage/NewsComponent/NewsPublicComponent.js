import React, {Component} from 'react';
import InstanceApi from '../../../api/instancesRepository';
import moment from 'moment';
import {Spin, Space, notification, Comment, Tooltip, List } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

class NewsPublicComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      params: this.props.params,
      news: null,
    }
  }

  componentDidMount(){
    InstanceApi.getNews(this.props.params.id_instance)
      .then(response => {
        this.setState({news: response});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente las novedades'});
    });
  }

  confirmDelete(id) {
    InstanceApi.deleteNews(id)
      .then(() => {
        this.componentDidMount();
        notification['success']({
          message: 'Excelente!',
          description:
          'Se ha eliminado la novedad'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos eliminar correctamente las novedades'});
    });
  }

  render(){
    if(this.state.news == null){
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }
    return (
      <div style={{paddingTop: '1%'}}>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={this.state.news}
          renderItem={item => (
            <li>
              <Comment
                content={<div dangerouslySetInnerHTML={{__html: item.description}} />}
                datetime={
                  <Space >
                    <Tooltip title={moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{moment(item.created_at).fromNow()}</span>
                    </Tooltip>
                     - Por:{item.created_by.first_name}{item.created_by.last_name}
                  </Space>
                }
              />
            </li>
          )}
        />
      </div>
    );
  }
}

export default NewsPublicComponent;