import './App.css';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import * as actions from './store/actions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Tree from './components/Tree/Tree';


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
      <Provider store={store}>
        <div id='App'>
          <div className={(this.state.light ? 'theme--light' : 'theme--default')}>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Tree />}/>
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;