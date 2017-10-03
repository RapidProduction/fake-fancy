import {
  gql,
  graphql,
 } from 'react-apollo';
 import { compose, withHandlers } from 'recompose';
 import { reduxForm } from 'redux-form';

import UserPreference from '../components/UserPreference';

const USER_PREFERENCE_QUERY = gql`
  query UserPreference {
    me {
      _id
      email
      preference {
        localizationLanguage {
          _id
          value
        }
        localizationTimeZone {
          _id
          value
        }
      }
    }
    languages {
      _id
      value
    }
    timeZones {
      _id
      value
    }
    currencies {
      _id
      value
    }
  }
`
export default compose(
  graphql(
    USER_PREFERENCE_QUERY,
    { name: 'userPreference' },
  ),
  withHandlers({
    handleSubmit: props => {
      console.log(props);
    },
  }),
  reduxForm({
    form: 'userPreference',
  }),
)(UserPreference);