import {
  gql,
  graphql,
 } from 'react-apollo';

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
  }
`
export default graphql(
  USER_PREFERENCE_QUERY,
  { name: 'userPreference' }
)(UserPreference);