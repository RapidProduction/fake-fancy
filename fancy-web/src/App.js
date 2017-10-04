import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserPreferencePage from './components/Page/UserPreferencePage';
import SignInPage from './components/Page/SignInPage';
import SignUpPage from './components/Page/SignUpPage';

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
