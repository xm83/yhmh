import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../forms/LoginForm'

class LoginPage extends React.Component {
  submit = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div>
        <h1>Login Page</h1>

        <LoginForm submit={this.submit}/>
      </div>
    );
  }
}

export default LoginPage;