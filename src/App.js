import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Panel, Form } from 'react-bootstrap';
import './Assets/css/default.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The intersection of mental health and technology</h1>
          <h1>HACK MENTAL HEALTH</h1>
        </header>
        <body>
          <h4>
            Let's come together to majorly redesign tech tools in a more meaningful, socially responsible way, leveraging the power of a truly interdisciplinary dialogue, including academics, designers, ethicists, computer scientists, psychologists, entrepreneurs, educators, and many more.
            We invite you to participate in one of the most pressing tasks in a rapidly transforming technological age: humanely redesigning an existing technology.
          </h4>
        </body>
        <Form horizontal className="LoginForm" id="loginForm">
          <TextField id="username" label="username" margin="normal"/>
          <TextField id="password" label="password" margin="normal"/>
          <Button variant="contained" color="primary">Register</Button>
        </Form>
        <p className="App-intro">
          For more information, please visit <code>https://www.hackmentalhealth.care/</code>
        </p>
      </div>
    );
  }
}

export default App;
