const mockCurrencies = require('../mocks/currencies');
const mockLanguages = require('../mocks/languages');
const mockTimeZones = require('../mocks/timeZones');

module.exports = {
  Query: {
    me: () => ({
      id: 0,
      email: 'test@domain.com',
      password: 'myHashPassword',
      preference: null
    }),
    currencies: async (root, _, { mongoConnector: { Currency } }) => {
      return await Currency.find({}).toArray();
    },
    languages: async (root, _, { mongoConnector: { Language } }) => {
      return await Language.find({}).toArray();
    },
    timeZones: async (root, _, { mongoConnector: { TimeZone } }) => {
      return await TimeZone.find({}).toArray();
    },
  }
};