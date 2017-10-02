import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
