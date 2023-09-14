const jwt = require('jsonwebtoken');
const Utils = require('../util/utilFunctions');
const User = require('../models/user.model');
const HTTPStatus = require('../util/http-status');

/**
 * @desc This function is being used to authenticate each private request
 * @author Growexx
 * @since 01/03/2021
 * @param {Object} req Request req.headers RequestBody req.headers.accessToken accessToken
 * @param {Object} res Response
 * @param {function} next exceptionHandler Calls exceptionHandler
 */


const checkUser = (me, res, next) => {
    User.findOne({ _id: me.id }, { password: 0, __v: 0 }).lean().then((userObj) => {
        const responseObject = Utils.errorResponse();
        if (!userObj) {
            responseObject.message = res.__('ACCESS_DENIED');
            res.status(HTTPStatus.UNAUTHORIZED).send(responseObject);
            return;
            // 0 = deactivate, 1 = activate
        } else if (userObj.isActive === 0) {
            responseObject.data = {
                status: userObj.isActive,
                message: res.__('DEACTIVATE_ACCOUNT_BY_ADMIN')
            };
            res.status(HTTPStatus.ACCOUNT_SUSPENDED).send(responseObject);
            return;
        } else {
            // Do nothing
        }
        res.locals.user = userObj;
        next();
    }).catch(next);
};


module.exports = function (req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, tokenDetail) => {
        if (err) {
            const responseObject = Utils.errorResponse();
            responseObject.message = res.__('ACCESS_DENIED');
            res.status(HTTPStatus.UNAUTHORIZED).send(responseObject);
        } else {
            checkUser(tokenDetail, res, next);
            return;
        }
    });
};
