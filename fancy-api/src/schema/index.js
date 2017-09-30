const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../resolvers');

const typeDefs = `
  type Query {
    me: User!
    preference: UserPreference!
    languages: [Language]!
    timeZones: [TimeZone]!
    currencies: [Currency]!
  }

  type Mutation {
    createUser(authProvider: AuthProviderSignupData!): User
    signinUser(credential: AUTH_PROVIDER_EMAIL): SigninPayload!
  }

  type Language {
    _id: ID!
    value: String!
  }

  type TimeZone {
    _id: ID!
    value: String!
  }

  type Currency {
    _id: ID!
    value: String!
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

  type User {
    _id: ID!
    email: String!
    password: String!
    preference: UserPreference
  }

  type SigninPayload {
    authenticatedToken: String!
    user: User!
  }

  input AuthProviderSignupData {
    credential: AUTH_PROVIDER_EMAIL
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });