import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      light: false
    }

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme() {
    this.setState({ light: !this.state.light })
  }

  render() {
    return (
      <div id="App">
        <div className={(this.state.light ? 'theme--light' : 'theme--default')}>
          <BrowserRouter>
            
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

export default App;
