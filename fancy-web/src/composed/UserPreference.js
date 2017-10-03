import {
  gql,
  graphql,
 } from 'react-apollo';
 import {
   compose,
   mapProps,
   withHandlers,
} from 'recompose';
 import { reduxForm } from 'redux-form';

import UserPreference from '../components/UserPreference';

const USER_PREFERENCE_QUERY = gql`
  query UserPreference {
    me {
      _id
      email
      preference {
        contentCategoryListEnable
        localizationCurrency { _id }
        localizationLanguage { _id }
        localizationTimeZone { _id }
        privacyMessage
        privacyProfileVisibility
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
  mapProps(props => {
    if(!props.userPreference.loading && !props.userPreference.error) {
      const {
        me: {
          preference: {
            contentCategoryListEnable,
            localizationCurrency,
            localizationLanguage,
            localizationTimeZone,
            privacyMessage,
            privacyProfileVisibility,
          }
        }
      } = props.userPreference;
      console.log(localizationLanguage.value);
      return {
        ...props,
        initialValues: {
          contentCategoryList: contentCategoryListEnable ? 'Enable' : 'Disable',
          localizationCurrency: localizationCurrency._id,
          localizationLanguage: localizationLanguage._id,
          localizationTimeZone: localizationTimeZone._id,
          privacyMessage: privacyMessage,
          privacyProfileVisibility: privacyProfileVisibility ? 'Everyone' : 'Private',
        },
      };
    }
    return props;
  }),
  withHandlers({
    handleSubmit: props => {
      console.log(props);
    },
  }),
  reduxForm({ form: 'userPreference' }),
)(UserPreference);