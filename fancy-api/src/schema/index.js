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

  type User {
    _id: ID!
    email: String!
    password: String!
    preference: UserPreference
  }

  type UserPreference {
    _id: ID!
    localization_language: String!
    localization_time_zone: String!
    localization_currency: String!
    privacy_profile_visibility: Boolean
    privacy_message: String!
    content_category_list_enable: Boolean
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
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });