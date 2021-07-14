const defaultConfig = {
    MONGO_URL: 'mongodb://localhost:27017/chatApplication',
    JWT_SECRET: process.env.ACCESS_TOKEN_SECRET
  };
module.exports = {
    ...defaultConfig
};