import * as React from 'react';
import {
  compose,
  withProps,
} from 'recompose';

import AuthenticationCard from '../components/AuthenticationCard';

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
)(AuthenticationCard);