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
  withProps({
    authenticatedTitle: 'Join Fancy',
    titleCaption: 'Fancy is the place to discover ' +
      'and buy amazing things curated by our global community.',
    title: 'Join Fancy',
    titleFacebook: 'Join with Facebook',
    titleGooglePlus: 'Google+',
    titleTwitter: 'Twitter',
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
      .then(response => {
        const {
          data: {
            signUpUser: {
              _id: id,
              email,
            }
          }
        } = response;
        console.log(id + " " + email);
      })
      .catch(error => {
        // TODO: Set the error flash message
        console.log(`There is error while signing up ${error}`);
      });
    },
  }),
  reduxForm({ form: 'signUp' }),
)(AuthenticationCard);