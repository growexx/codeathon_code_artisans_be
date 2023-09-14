const ForgotPasswordService = require('./forgotPasswordService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for forgot password Details.
 */

class ForgotPasswordController {

    /**
     * @desc This function is being used to generate reset link to reset password
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email of user to reset password
     * @param {function} res Response
     */
    static async forgotPassword (req, res) {
        try {
            const data = await ForgotPasswordService.forgotPassword(req, res);
            Utils.sendResponse(null, data, res, MESSAGES.FORGOT_PASSWORD_LINK_SENT_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to verify token for reset password
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.token token to verify it's valid or not
     * @param {function} res Response
     */
    static async verifyToken (req, res) {
        try {
            const data = await ForgotPasswordService.verifyToken(req);
            Utils.sendResponse(null, data, res, MESSAGES.LINK_IS_VALID);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }


    /**
     * @desc This function is being used to verify token for reset password
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.token token to verify it's valid or not
     */
    static async resetPassword (req, res) {
        try {
            const data = await ForgotPasswordService.resetPassword(req);
            Utils.sendResponse(null, data, res, MESSAGES.RESET_PASSWORD_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = ForgotPasswordController;

