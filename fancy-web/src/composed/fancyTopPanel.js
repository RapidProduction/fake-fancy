import {
  gql,
  graphql,
} from 'react-apollo';
import {
  compose,
  mapProps,
  withHandlers,
  withState,
  withProps,
} from 'recompose';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';

import TopPanel from '../components/TopPanel/TopPanel';
import { revokeSession } from '../libs/sessionHandler';

const USER_QUERY = gql`
  query User {
    me {
      _id
      email
    }
  }
`;

export default compose(
  withRouter,
  graphql(
    USER_QUERY,
    { name: 'user' },
  ),
  withProps({ title: 'Fancy' }),
  withState('isLoggedIn', 'setIsLoggedInState', true),
  mapProps(props => ({
    ...props,
    isLoggedIn: !props.user.loading && !props.user.error,
  })),
  mapProps(props => ({
    ...props,
    authenticatedButtonTitle: props.isLoggedIn ? 'Log Out' : 'Log In',
  })),
  withHandlers({
    onAuthenticate: ({
      history,
      isLoggedIn,
      setIsLoggedInState
    }) => {
      if(isLoggedIn) {
        revokeSession();
        history.push('/');
        setIsLoggedInState(false);
      }
    },
  }),
  reduxForm({ form: 'signIn' }),
)(TopPanel);