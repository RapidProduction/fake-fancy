import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  combineReducers,
  createStore,
} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// GraphQL setting up
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:7001/graphql',
});
networkInterface.use([{
  applyMiddleware(request, next) {
    if (!request.options.headers) {
      request.options.headers = {};
    }
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZDEyMzUzMWI0NTBlZjU1NDY2OWVhZCIsImVtYWlsIjoibWF4OEBkb21haW4uY29tIiwiaWF0IjoxNTA3MDU3MTE0LCJleHAiOjE1MDcwNjA3MTR9.T3NWQrLas9yzWOELRa2LjTF4QGxunHCn8ZJIPh79B7U';
    request.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

// Enhancers
export const apolloClient = new ApolloClient({ networkInterface });
const store = createStore(
  combineReducers({ form: formReducer }),
  composeWithDevTools()
);

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
