import * as React from 'react';
import {
  compose,
  withProps,
} from 'recompose';

import AuthenticationCard from '../components/AuthenticationCard/AuthenticationCard';

export default compose(
  withProps({
    authenticatedTitle: 'Log In',
    title: 'Log In',
    titleFacebook: 'Log in with Facebook',
    titleGooglePlus: 'Google+',
    titleTwitter: 'Twitter',
  }),
)(AuthenticationCard);