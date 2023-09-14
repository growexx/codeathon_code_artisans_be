const Connection = require('./../connection');

module.exports = async function (req, res, next) {
    await Connection.checkConnection();
    next();
};
