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
import { withRouter } from 'react-router';

import AuthenticationCard from '../components/AuthenticationCard';
import { revokeSession } from '../libs/sessionHandler';

const SIGNUP_MUTATION = gql`
  mutation SignUpUser(
    $email: String!
    $password: String!
  ){
    signUpUser(
      credential: {
        email: $email
        password: $password
      }
    ) {
      _id
      email
    }
  }
`;

export default compose(
  withRouter,
  withProps({
    authenticatedTitle: 'Join Fancy',
    titleCaption: 'Fancy is the place to discover ' +
      'and buy amazing things curated by our global community.',
    title: 'Join Fancy',
    titleFacebook: 'Join with Facebook',
    titleGooglePlus: 'Google+',
    titleTwitter: 'Twitter',
    titleLinkPage: 'Log In',
    descriptionLinkPage: 'Already on Fancy?',
    linkPageUrl: '',
  }),
  graphql(
    SIGNUP_MUTATION,
    { name: 'signUp' },
  ),
  withHandlers({
    onSubmit: props => formValues => {
      revokeSession();
      props.signUp({
        variables: {
          email: formValues.username,
          password: formValues.password,
        },
      })
      .then(_ => {
        props.history.push('/');
      })
      .catch(error => {
        // TODO: Set the error flash message
        console.log(`There is error while signing up ${error}`);
      });
    },
  }),
  reduxForm({ form: 'signUp' }),
)(AuthenticationCard);