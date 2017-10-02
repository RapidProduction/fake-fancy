import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserPreferencePage from './components/UserPreferencePage/UserPreferencePage';
import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignInPage />
        <div>---</div>
        <SignUpPage />
        <div>---</div>
        <UserPreferencePage />
      </div>
    );
  }
}

export default App;
