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
import { getAuthenticationToken } from './libs/sessionHandler';

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
    const token = getAuthenticationToken();
    if(token) {
      request.options.headers.authorization = `Bearer ${token}`;
    }
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
