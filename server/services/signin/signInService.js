const crypt = require('../../util/crypt');
const signInValidator = require('./signInValidator');
const User = require('../../models/user.model');

/**
 * Class represents services for signin.
 */
class SignInService {
    /**
     * @desc This function is being used to sign in user
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {Object} locale Locale passed from request
     * @param {Object} res Response
     */
    static async signIn (req, locale) {
        const Validator = new signInValidator(req.body, locale);
        Validator.validate();
        const email = req.body.email.toLowerCase();
        return await SignInService.userLogin(email, req.body.password);
    }

    /**
     * @desc This function is being used to end user login
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} userEmail userEmail
     * @param {Object} password password
     * @param {Object} res Response
     * @param {function} callback callback Handles Response data/error messages
     * @param {function} next exceptionHandler Calls exceptionHandler
     */
    static async userLogin (userEmail, password) {
        let user = await User.findOne({ email: userEmail }).lean();

        // Wrong username
        if (!user) {
            throw {
                message: MESSAGES.LOGIN_FAILED,
                statusCode: 401
            };
        } else if (user.isActive) {
            // Wrong Password
            const isMatch = await crypt.comparePassword(password, user.password);

            if (!isMatch) {
                throw {
                    message: MESSAGES.LOGIN_FAILED,
                    statusCode: 401
                };
            } else {
                const token = await crypt.getUserToken(user);
                delete user.password;
                delete user.__v;
                user = _.merge(user, token);
                return user;
            }
        } else {
            throw {
                data: { email: user.email, role: user.role },
                message: MESSAGES.USER_INACTIVE,
                statusCode: 423
            };
        }
    }
}

module.exports = SignInService;
