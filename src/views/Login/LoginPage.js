import React, {Component} from 'react';
import {LoginForm} from './LoginForm';
import {notification, Card} from 'antd';
import AuthApi from '../../api/authRepository';

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
      }
    };
  }

  onChange = (e) => {
    let user = Object.assign({},this.state.user);
    user[e.target.name] = e.target.value;
    this.setState({user});
  };

  onSubmit = (e) => {
    console.log(this.state.user);
    const user = Object.assign({},this.state.user);
    user.username = user.email;
    console.log("USER", user);
    AuthApi.logIn(user)
      .then(r => {
        console.log("RRRRRR");
        this.props.history.push('/admin/procesos');
      }).catch(e => {
        console.log(e);
        notification['error']({
          message: 'Error!',
          description:
          'El usuario no esta registrado'});
    });
  };

  render(){
    return (
      <div className="container" style={{background: '#6b6767', padding: '3%', minHeight: '100vh'}}>
        <Card title="Administrador Mesa de Ayuda DCC" width='300px'>
        <LoginForm
          user={this.state.user}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        </Card>
      </div>
    );
  }
}

export default LoginPage;