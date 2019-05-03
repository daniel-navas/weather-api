const secrets = {
  dbUri: process.env.DB_URI || 'mongodb://mongo:27017/weather',
};

const getSecret = (key) => secrets[key];

module.exports = { getSecret };
