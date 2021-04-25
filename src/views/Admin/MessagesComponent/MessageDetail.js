import React, {Component} from 'react';
import ChatApi from '../../../api/chatRepository';
import { Input, Button, Row, Col, Layout, Menu, notification, Comment, Avatar } from 'antd';
import { ChatFeed, Message } from 'react-chat-ui'
import { SendOutlined } from '@ant-design/icons';

const { Footer } = Layout;

class MessageDetail extends Component {
  constructor(props){
    super(props);
    const uri = `${process.env.REACT_APP_WS_URL}${this.props.match.params.chat_id}/`;
    this.state = {
      chatSocket: new WebSocket(uri),
      chat: null,
      messages: []
    }
  }

  componentDidMount(){
    ChatApi.getChats()
      .then(response => {
        this.setState({chats: response.map((chat) => {
          return (<Menu.Item key={chat.chat_id}>
              <Comment
                      author={<p>{chat.first_name} {chat.last_name}</p>}
                      avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>}
                      content={<p>Mensaje nuevo</p>}
                    />
            </Menu.Item>)
        })});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente los chats'});
    });

    let chatSocket = this.state.chatSocket;

    chatSocket.onopen = () => {
      chatSocket.send(JSON.stringify({
        'message': '',
        'bot': false,
        'command': 'fetch_messages'
      }));
    };

    chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const messages = this.state.messages;

      messages.push(new Message({id: data.fromTelegram ? 1 : 0, message: data.message}));
      this.setState({messages: messages});
      document.querySelector('#chat-message-input').value ='';
    };

    chatSocket.onclose = (e) => {
      document.querySelector('#chat-message-input').value ='';
      console.error('Chat socket closed unexpectedly');
    };

    document.querySelector('#chat-message-input').focus();
    document.querySelector('#chat-message-input').onkeyup = (e) => {
      if (e.keyCode === 13) {  // enter, return
        document.querySelector('#chat-message-submit').click();
      }
    };

    document.querySelector('#chat-message-submit').onclick = (e) => {
      const messageInputDom = document.querySelector('#chat-message-input');
      const message = messageInputDom.value;
      chatSocket.send(JSON.stringify({
        'message': message,
        'bot': false,
        'command': 'new_message'
      }));
      messageInputDom.value = '';
    };

    this.setState({ chatSocket })
  }

  render(){
    return (
      <Row gutter={[0, 0]}>
        <Col span={24}>
          <div key="content" className="site-layout-background" style={{ maxHeight: "100vh" }}>
            <div style={{ overflow: "auto", minHeight:"75vh" }}>
              <ChatFeed
                messages={this.state.messages} // Array: list of message objects
                isTyping={false} // Boolean: is the recipient typing
                hasInputField={false} // Boolean: use our input, or use your own
                showSenderName // show the name of the user who sent the message
                bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                bubbleStyles={{text: {fontSize: 12}}}
              />
            </div>

            
            
            <Footer>
              <Row gutter={[8, 8]}>
                <Col span={23}><Input defaultValue="" width="50px" id="chat-message-input" placeholder="Escribe un mensaje" /></Col>
                <Col span={1}><Button id="chat-message-submit" type="primary" shape="circle" icon={<SendOutlined />} /></Col>
              </Row>
            </Footer>
          </div>
        </Col>
      </Row>
    );
  }
}

export default MessageDetail;