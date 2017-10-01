const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../resolvers');

const typeDefs = `
  type Query {
    me: DisplayableUser!
    languages: [Language]!
    timeZones: [TimeZone]!
    currencies: [Currency]!
  }

  type Mutation {
    signUpUser(credential: InputAuthProviderEmail!): User
    signInUser(credential: InputAuthProviderEmail): SignInPayload!
    signOutUser: Boolean
    updateUserPreference(preference: InputUserPreference): UserPreference
  }

  type Language {
    _id: ID!
    value: String
  }

  type TimeZone {
    _id: ID!
    value: String
  }

  type Currency {
    _id: ID!
    value: String
  }

  enum PrivacyProfileMessage {
    Everyone
    Follower
    None
  }

  type UserPreference {
    _id: ID!
    localizationLanguage: Language
    localizationTimeZone: TimeZone
    localizationCurrency: Currency
    privacyProfileVisibility: Boolean
    privacyMessage: PrivacyProfileMessage
    contentCategoryListEnable: Boolean
  }

  type DisplayableUser {
    _id: ID!
    email: String!
    preference: UserPreference
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    preference: UserPreference
  }

  type SignInPayload {
    authenticatedToken: String!
    user: User!
  }

  input InputAuthProviderEmail {
    email: String!
    password: String!
  }

  input InputUserPreference {
    localizationLanguageId: ID
    localizationTimeZoneId: ID
    localizationCurrencyId: ID
    privacyProfileVisibility: Boolean
    privacyMessage: PrivacyProfileMessage
    contentCategoryListEnable: Boolean
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });