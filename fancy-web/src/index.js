import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:7001/graphql',
});
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZDEyMzBkMjRhMzI2ZjRmMmI5OGJiNyIsImVtYWlsIjoibWF4N0Bkb21haW4uY29tIiwiaWF0IjoxNTA2OTY5MDMzLCJleHAiOjE1MDY5NzI2MzN9.7461D3-Tb1pQB90fGBP654H7FicuJRJt2aHZX4s52bs';
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

const client = new ApolloClient({ networkInterface });
const store = createStore(composeWithDevTools());

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
