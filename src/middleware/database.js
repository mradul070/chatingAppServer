const mongoose = require('mongoose')
const constants = require('../../config/config')
console.log(constants.MONGO_URL)
mongoose.Promise = global.Promise;


try {
  mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e
})