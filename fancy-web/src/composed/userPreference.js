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
 import { withRouter } from 'react-router';

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
`;

const USER_PREFERENCE_UPDATE = gql`
  mutation UpdateUserPreference(
      $localizationLanguageId: ID,
      $localizationTimeZoneId: ID,
      $localizationCurrencyId: ID,
      $privacyProfileVisibility: Boolean,
      $privacyMessage: PrivacyProfileMessage,
      $contentCategoryListEnable: Boolean,
    ){
    updateUserPreference(
      preference:{
        localizationLanguageId: $localizationLanguageId
        localizationTimeZoneId: $localizationTimeZoneId
        localizationCurrencyId: $localizationCurrencyId
        privacyProfileVisibility: $privacyProfileVisibility,
        privacyMessage: $privacyMessage,
        contentCategoryListEnable: $contentCategoryListEnable,
      }
    ) {
      _id
    }
  }
`;

export default compose(
  withRouter,
  graphql(
    USER_PREFERENCE_QUERY,
    { name: 'userPreference' },
  ),
  graphql(
    USER_PREFERENCE_UPDATE,
    { name: 'updateUserPreference' },
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
    onSubmit: props => formValues => {
      props.updateUserPreference({
        variables: {
          contentCategoryListEnable: formValues.contentCategoryList === 'Enable' ? true : false,
          localizationCurrencyId: formValues.localizationCurrency,
          localizationLanguageId: formValues.localizationLanguage,
          localizationTimeZoneId: formValues.localizationTimeZone,
          privacyMessage: formValues.privacyMessage,
          privacyProfileVisibility: formValues.privacyProfileVisibility === 'Everyone' ? true : false,
        }
      });
    },
  }),
  reduxForm({ form: 'userPreference' }),
)(UserPreference);