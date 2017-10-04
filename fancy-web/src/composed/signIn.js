import { gql } from 'react-apollo';
import {
  compose,
  withHandlers,
  withProps,
} from 'recompose';
import { reduxForm } from 'redux-form';

import AuthenticationCard from '../components/AuthenticationCard';
import { setAuthenticationToken } from '../libs/sessionHandler';

export default compose(
  withProps({
    authenticatedTitle: 'Log In',
    title: 'Log In',
    titleFacebook: 'Log in with Facebook',
    titleGooglePlus: 'Google+',
    titleTwitter: 'Twitter',
  }),
  withHandlers({
    onSubmit: props => formValues => {
      const LOGIN_MUTATION = gql`
        mutation {
          signInUser(
            credential: {
              email: "max8@domain.com"
              password: "anotherPassword"
            }
          ) {
            authenticatedToken
          }
        }
      `
      client.query(LOGIN_MUTATION
      }).then(response => console.log(response.data.allLinks))
      console.log(formValues);
      console.log(props.context);
      setAuthenticationToken(formValues.username);
    },
  }),
  reduxForm({ form: 'signIn' }),
)(AuthenticationCard);