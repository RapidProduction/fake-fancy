import {
  gql,
  graphql,
} from 'react-apollo';
import {
  compose,
  withHandlers,
  withProps,
} from 'recompose';
import { reduxForm } from 'redux-form';

import AuthenticationCard from '../components/AuthenticationCard';
import { setAuthenticationToken } from '../libs/sessionHandler';
import { apolloClient } from '../index';

const LOGIN_MUTATION = gql`
mutation SignInUser(
  $email: String!
  $password: String!
){
  signInUser(
    credential: {
      email: $email
      password: $password
    }
  ) {
    authenticatedToken
  }
}
`;

export default compose(
  graphql(
    LOGIN_MUTATION,
    { name: 'login' },
  ),
  withProps({
    authenticatedTitle: 'Log In',
    title: 'Log In',
    titleFacebook: 'Log in with Facebook',
    titleGooglePlus: 'Google+',
    titleTwitter: 'Twitter',
  }),
  withHandlers({
    onSubmit: props => formValues => {
      props.login({
        variables: {
          email: formValues.username,
          password: formValues.password,
        },
      })
      .then(response => {
        const {
          data: {
            signInUser: {
              authenticatedToken
            }
          }
        } = response;
        setAuthenticationToken(authenticatedToken);
      })
      .catch(error => {
        console.log("There is error while logging-in");
      });
    },
  }),
  reduxForm({ form: 'signIn' }),
)(AuthenticationCard);