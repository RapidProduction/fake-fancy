const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../resolver');

const typeDefs = `
  type Query {
    me: User!
    preference: UserPreference!
    languages: [Language]!
    timeZones: [TimeZone]!
    currencies: [Currency]!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    preference: UserPreference
  }

  type UserPreference {
    id: ID!
    localization_language: String!
    localization_time_zone: String!
    localization_currency: String!
    privacy_profile_visibility: Boolean
    privacy_message: String!
    content_category_list_enable: Boolean
  }

  type Language {
    id: ID!
    value: String!
  }

  type TimeZone {
    id: ID!
    value: String!
  }

  type Currency {
    id: ID!
    value: String!
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });