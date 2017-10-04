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

const SIGNIN_MUTATION = gql`
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
  withProps({
    authenticatedTitle: 'Log In',
    title: 'Log In',
    titleFacebook: 'Log in with Facebook',
    titleGooglePlus: 'Google+',
    titleTwitter: 'Twitter',
  }),
  graphql(
    SIGNIN_MUTATION,
    { name: 'signIn' },
  ),
  withHandlers({
    onSubmit: props => formValues => {
      props.signIn({
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
        // TODO: Set the error flash message
        console.log(`There is error while signing in ${error}`);
      });
    },
  }),
  reduxForm({ form: 'signIn' }),
)(AuthenticationCard);