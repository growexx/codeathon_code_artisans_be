const mongoose = require('mongoose');

const mongoHost = `${process.env.DB_HOST}/${process.env.DB_NAME}`;
const mongoCredetials = process.env.DB_USERNAME ?
    `${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@` : '';
const dbUrl = `mongodb://${mongoCredetials}${mongoHost}`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: true,
    bufferMaxEntries: 0,
    useFindAndModify: false,
    useCreateIndex: true,
    poolSize: 10
};
class Connection {

  static async connectToDB () {
    await mongoose.connect(dbUrl, options).then(() => {
      CONSOLE_LOGGER.info('MongoDB is connected');
    }).catch((err) => {
      CONSOLE_LOGGER.info('DB Connection err',err);
      CONSOLE_LOGGER.info('MongoDB connection unsuccessful, retry after 0.5 seconds.');
      setTimeout(Connection.connectToDB, 500);
    });
    return mongoose.connection.readyState;
  }

  static async checkConnection () {
    return new Promise(async(resolve) => {
      const db = await mongoose.connection.readyState;
      if (db !== 1) {
        const dbStatus = await Connection.connectToDB();
        resolve(dbStatus);
      } else {
        resolve(db);
      }
    });
  }

}

module.exports = Connection;
