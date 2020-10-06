import React, {Component} from 'react';
import InstanceApi from '../../../api/instancesRepository';
import moment from 'moment';
import NewsCreateForm from './NewsCreateForm';
import {Spin, notification, Popconfirm, Button, Comment, Tooltip, List } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class NewsComponent extends Component {
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
        <NewsCreateForm {...this.props} componentDidMount={() => this.componentDidMount()}/>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={this.state.news}
          renderItem={item => (
            <li>
              <Comment
              avatar={
                <Popconfirm
                  placement="topRight"
                  title="¿Estas seguro que quieres eliminar esta novedad?"
                  onConfirm={() => {this.confirmDelete(item.id)}}
                  okText="Si"
                  cancelText="No"
                >
                  <Button icon={<FontAwesomeIcon icon={faTrash}/>} type="text" />
                </Popconfirm>
              }
                content={<div dangerouslySetInnerHTML={{__html: item.description}} />}
                datetime={
                  <Tooltip title={moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(item.created_at).fromNow()}</span>
                  </Tooltip>
                }
              />
            </li>
          )}
        />
      </div>
    );
  }
}

export default NewsComponent;