const authenticated = require('../libs/authentication');

module.exports = {
  Query: {
    me: (root, data, { _, user }) => {
      console.log(user);
      authenticated(user);
      return {
        id: 0,
        email: 'test@domain.com',
        password: 'myHashPassword',
        preference: null
      }
    },
    currencies: async (root, _, { mongoConnector: { Currency } }) => {
      return await Currency.find({}).toArray();
    },
    languages: async (root, _, { mongoConnector: { Language } }) => {
      return await Language.find({}).toArray();
    },
    timeZones: async (root, _, { mongoConnector: { TimeZone } }) => {
      return await TimeZone.find({}).toArray();
    },
  },
  Mutation: {
    signupUser: async (root, data, { mongoConnector: { User }}) => {
      const newUser = {
        email: data.authProvider.credential.email,
        password: data.authProvider.credential.password,
        localization_language: null,
        localization_time_zone: null,
        localization_currency: null,
        privacy_profile_visibility: true,
        privacy_message: 'Follower',
        content_category_list_enable: true,
        // TODO: Add default user preference here
      }
      const response = await User.insert(newUser);
      const userId = response.insertedIds[0];
      return Object.assign(
        { _id: userId },
        {
          email: newUser.email,
          password: newUser.password,
          // preference: {
          //   _id: userId,
          //   localization_language: newUser.localization_language,
          //   localization_currency: newUser.localization_currency,
          //   localization_time_zone: newUser.localization_time_zone,
          //   privacy_profile_visibility: newUser.privacy_profile_visibility,
          //   privacy_message: newUser.privacy_message,
          //   content_category_list_enable: newUser.content_category_list_enable,
          // },
        },
      );
    },
    signinUser: async (root, data, { mongoConnector: { User } }) => {
      const user = await User.findOne({ email: data.credential.email });
      if (data.credential.password === user.password) {
        return { authenticatedToken: `token-${user.email}`, user };
      }
    },
  },
  // Own type resolvers
  // User: () => null,
  // UserPreference: () => null,
  // Currency: async (root, { id }, { mongoConnector: { Currency } }) => {
  //   return await Currency.find(id);
  // },
  // Language: async (root, { id }, { mongoConnector: { Language } }) => {
  //   return await Language.find(id);
  // },
  // TimeZone: async (root, { id }, { mongoConnector: { TimeZone } }) => {
  //   return await TimeZone.find(id);
  // },
};