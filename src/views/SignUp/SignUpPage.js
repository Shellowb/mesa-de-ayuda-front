import React, {Component} from 'react';
import {SignUpForm} from './SignUpForm';
import {notification} from 'antd';
import AuthApi from '../../api/authRepository';

class SignUpPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        password1: '',
        password2: ''
      }
    };
  }

  onChange = (e) => {
    let user = Object.assign({},this.state.user);
    user[e.target.name] = e.target.value;
    this.setState({user});
  }; 

  onSubmit = (e) => {
    e.preventDefault();
    const user = Object.assign({},this.state.user);
    user.username = user.email;
    AuthApi.signUp(user)
    .then(r => {
      notification['success']({
        message: 'Perfecto!',
        description:
        'Usuario creado Exitosamente'});
    }).catch(e => {
      notification['error']({
        message: 'Error!',
        description:
        'No hemos podido crear el usuario'});
    });
  }

  render(){
    return (
      <div className="container">
        <SignUpForm
          user={this.state.user}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default SignUpPage;