import {
  compose,
  withProps,
} from 'recompose';
import { reduxForm } from 'redux-form';

import AuthenticationCard from '../components/AuthenticationCard';

export default compose(
  withProps({
    authenticatedTitle: 'Log In',
    title: 'Log In',
    titleFacebook: 'Log in with Facebook',
    titleGooglePlus: 'Google+',
    titleTwitter: 'Twitter',
  }),
  reduxForm({
    form: 'signIn',
  }),
)(AuthenticationCard);