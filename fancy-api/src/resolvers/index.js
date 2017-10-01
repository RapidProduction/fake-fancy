const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const { authenticated } = require('../libs/authentication');

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
    signUpUser: async (root, data, { mongoConnector: { User }}) => {
      const anotherUser = await User.findOne({ email: data.credential.email });
      if(anotherUser) {
        throw new Error('Username is used by another user');
      }

      const newUser = {
        email: data.credential.email,
        password: bcrypt.hashSync(data.credential.password),
        localization_language: null,
        localization_time_zone: null,
        localization_currency: null,
        privacy_profile_visibility: true,
        privacy_message: 'Follower',
        content_category_list_enable: true,
      }
      const response = await User.insert(newUser);
      const userId = response.insertedIds[0];

      return Object.assign(
        { _id: userId },
        {
          email: newUser.email,
          password: newUser.password,
          preference: {
            _id: userId,
            localization_language: newUser.localization_language,
            localization_currency: newUser.localization_currency,
            localization_time_zone: newUser.localization_time_zone,
            privacy_profile_visibility: newUser.privacy_profile_visibility,
            privacy_message: newUser.privacy_message,
            content_category_list_enable: newUser.content_category_list_enable,
          },
        },
      );
    },
    signInUser: async (root, data, { request, response }) => {
      // We need to assign this body again due to passport does not support GraphQL params
      request.body = Object.assign({}, request.body, {
        username: data.credential.email,
        password: data.credential.password,
      });

      user = new Promise((resolve, reject) => {
        passport.authenticate('local', (error, user, information) => {
          if(!user) {
            reject('Incorrect username or password');
          }
          resolve(user);
        })(request, response, () => {});
      }).catch((error) => {
        throw new Error(error);
      });
      return { authenticatedToken: `token-${user.email}`, user };
    },
    signOutUser: async (root, data, { request }) => {
      request.logout();
      return true;
    },
  },
  User: () => null,
  UserPreference: () => null,
  Currency: async (root, { id }, { mongoConnector: { Currency } }) => {
    return await Currency.find(id);
  },
  Language: async (root, { id }, { mongoConnector: { Language } }) => {
    return await Language.find(id);
  },
  TimeZone: async (root, { id }, { mongoConnector: { TimeZone } }) => {
    return await TimeZone.find(id);
  },
};