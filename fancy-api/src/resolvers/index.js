const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const {
  authenticate,
  authenticationGuard,
  generateToken,
} = require('../libs/authentication');

const { mongoId } = require('../connectors/mongo-connector');

module.exports = {
  Query: {
    me: (root, data, { user, request }) => {
      authenticationGuard(user);
      return {
        _id: user._id,
        email: user.email,
      };
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
    signUpUser: async (
      root,
      data,
      { mongoConnector: { User, Language, TimeZone, Currency } }) => {
      const anotherUser = await User.findOne({ email: data.credential.email });
      if(anotherUser) {
        throw new Error('Username is used by another user');
      }

      const newUser = {
        email: data.credential.email,
        password: bcrypt.hashSync(data.credential.password),
        localizationLanguageId: (await Language.findOne())._id,
        localizationTimeZoneId: (await TimeZone.findOne())._id,
        localizationCurrencyId: (await Currency.findOne())._id,
        privacyProfileVisibility: true,
        privacyMessage: 'Follower',
        contentCategoryListEnable: true,
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
            privacyProfileVisibility: newUser.privacyProfileVisibility,
            privacyMessage: newUser.privacyMessage,
            contentCategoryListEnable: newUser.contentCategoryListEnable,
          },
        },
      );
    },
    signInUser: async (root, data, { request }) => {
      // We need to assign this body again due to passport does not support GraphQL params
      request.body = Object.assign({}, request.body, {
        username: data.credential.email,
        password: data.credential.password,
      });

      user = await new Promise((resolve, reject) => {
        passport.authenticate('local', (error, user, information) => {
          if(!user) {
            reject('Incorrect username or password');
          }
          resolve(user);
        })(request);
      }).catch((error) => {
        throw new Error(error);
      });
      return { authenticatedToken: generateToken(user), user };
    },
    signOutUser: async (root, data, { request }) => {
      request.logout();
      return true;
    },
    updateUserPreference: async (root, data, { mongoConnector: { User }, user }) => {
      authenticationGuard(user);
      const updatedUserPreference = await User.updateOne(
        { _id: mongoId(user._id) },
        { $set: data.preference },
      );
      return Object.assign(
        {
          _id: user._id,
          email: user.email
        },
        data.preference,
      );
    },
  },
  DisplayableUser: {
    preference: async ({ _id, email }, _, { mongoConnector: { User } }) => {
      const user = await User.findOne({ _id: mongoId(_id) });
      return {
        _id,
        email,
        localizationLanguageId: user.localizationLanguageId,
        localizationCurrencyId: user.localizationCurrencyId,
        localizationTimeZoneId: user.localizationTimeZoneId,
        privacyProfileVisibility: user.privacyProfileVisibility,
        privacyMessage: user.privacyMessage,
        contentCategoryListEnable: user.contentCategoryListEnable,
      }
    },
  },
  UserPreference: {
    localizationLanguage: async ({ _id, email }, _, { mongoConnector: { User } }) => {
      const user = await User.findOne({ email });
      return { _id: user.localizationLanguageId };
    },
    localizationTimeZone: async ({ _id, email }, _, { mongoConnector: { User } }) => {
      const user = await User.findOne({ email });
      return { _id: user.localizationTimeZoneId };
    },
    localizationCurrency: async ({ _id, email }, _, { mongoConnector: { User } }) => {
      const user = await User.findOne({ email });
      return { _id: user.localizationCurrencyId };
    },
  },
  Language: {
    value: async ({ _id }, _, { mongoConnector: { Language } }) => {
      const language = await Language.findOne({ _id: mongoId(_id) });
      console.log(language);
      return language.value;
    },
  },
  Currency: {
    value: async ({ _id }, _, { mongoConnector: { Currency } }) => {
      const currency = await Currency.findOne({ _id: mongoId(_id) });
      return currency.value;
    },
  },
  TimeZone: {
    value: async ({ _id }, _, { mongoConnector: { TimeZone } }) => {
      const timeZone = await TimeZone.findOne({ _id: mongoId(_id) });
      return timeZone.value;
    },
  },
};