import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import routes from '../../routes';

const AppContainer = () => (
  <Router>
    <div>
      <div>FANCY</div>
      {
        routes.map(({ path, component }) =>
          <Route exact key={path} path={path} component={component}/>
        )
      }
    </div>
  </Router>
);

export default AppContainer;