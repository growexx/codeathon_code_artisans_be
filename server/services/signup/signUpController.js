
const SignUpService = require('./signUpService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for signup.
 */
class SignUpController {
    /**
     * @desc This function is being used to signUp user
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     * @param {Object} res Response
     */
    static async signUp (req, res) {
        try {
            req.body.userType = CONSTANTS.ROLE.USER;
            const data = await SignUpService.signUp(req);
            Utils.sendResponse(null, data, res, MESSAGES.REGISTER_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to verify user account
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {Object} req.body.token token
     * @param {Object} res Response
     */
    static async verifyAccount (req, res) {
        try {
            const data = await SignUpService.verifyAccount(req);
            Utils.sendResponse(null, data, res, MESSAGES.USER_VERIFY_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to resendOTP to user user
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {Object} res Response
     */
    static async resendOTP (req, res) {
        try {
            const data = await SignUpService.resentOTP(req);
            Utils.sendResponse(null, data, res, MESSAGES.REGISTER_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = SignUpController;
