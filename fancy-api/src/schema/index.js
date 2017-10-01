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
    signUpUser(credential: AUTH_PROVIDER_EMAIL!): User
    signInUser(credential: AUTH_PROVIDER_EMAIL): SignInPayload!
    signOutUser: Boolean
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
    localization_language: Language!
    localization_time_zone: TimeZone!
    localization_currency: Currency!
    privacy_profile_visibility: Boolean
    privacy_message: PrivacyProfileMessage
    content_category_list_enable: Boolean
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

  input AuthProviderSignUpData {
    credential: AUTH_PROVIDER_EMAIL
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });