import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(composeWithDevTools());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
