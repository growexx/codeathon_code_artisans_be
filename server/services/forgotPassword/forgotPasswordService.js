const Crypt = require('../../util/crypt');
const User = require('../../models/user.model');
const Email = require('../../util/sendEmail');
const validation = require('../../util/validation');
const Random = require('randomstring');

/**
 * Class represents services fo forgot/reset password .
 */
class ForgotPasswordService {

    /**
     * @desc This function is being used to generate reset link to reset password
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     */
    static async forgotPassword (req) {
        const Validator = new validation();
        await Validator.email(req.body.email);
        const userEmail = req.body.email.toLowerCase();
        const userObj = await User.findOne({ email: userEmail }).exec();
        if (userObj) {
            const resetLink = Random.generate(12);
            const appUrl = process.env.FRONTEND_URL;
            const actionURL = `${appUrl}/reset-password/${resetLink}`;
            const date = MOMENT().add(1, 'day').utc();
            await User.updateOne({
                email: userEmail
            }, {
                $set: {
                    resetToken: resetLink,
                    resetExpiryTime: date
                }
            });

            const subject = 'Reset your password to access your account';
            const template = 'emailTemplates/forgotPasswordMail.html';
            const templateVariables = { appUrl, actionURL };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
        }
    }


    /**
     * @desc This function is being used to verify token for reset password
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request req.body RequestBody
     */
    static async verifyToken (req) {
        if (!req.body.token) {
            throw {
                message: MESSAGES.LINK_IS_NOT_VALID,
                statusCode: 400
            };
        }

        const compareDate = MOMENT().utc().unix();
        const userList = await User.findOne({ resetToken: req.body.token }).exec();
        if (!userList || compareDate > MOMENT(userList.resetExpiryTime).utc().unix()) {
            throw {
                message: MESSAGES.RESET_LINK_EXPIRED,
                statusCode: 400
            };
        }
    }


    /**
     * @desc This function is being used to reset password
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request req.body RequestBody
     */
    static async resetPassword (req) {
        if (!req.body.token || !req.body.password) {
            throw {
                message: MESSAGES.INVALID_REQUEST,
                statusCode: 400
            };
        }

        const Validator = new validation();
        await Validator.password(req.body.password);

        const userList = await User.findOne({
            resetToken: req.body.token,
            resetExpiryTime: { $exists: true, $ne: null }
        }).exec();
        const compareDate = MOMENT().utc().unix();
        if (userList && userList.resetExpiryTime) {
            if (compareDate > MOMENT(userList.resetExpiryTime).utc().unix()) {
                throw {
                    message: MESSAGES.RESET_LINK_EXPIRED,
                    statusCode: 400
                };
            } else {

                const hash = await Crypt.enCryptPassword(req.body.password);
                if (hash) {
                    await User.updateOne({
                        resetToken: req.body.token
                    }, {
                        $set: {
                            password: hash,
                            resetExpiryTime: null,
                            resetToken: null
                        }
                    });
                }
            }
        }
    }
}

module.exports = ForgotPasswordService;
