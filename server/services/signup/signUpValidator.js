const validation = require('../../util/validation');
/**
 * Class represents validations for signup.
 */
class SignUpValidator extends validation {
    constructor (body,locale) {
        super(locale);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate request for user signUp
     * @author Growexx
     * @since 27/03/2021
     */
    validate () {
        super.email(this.body.email);
        super.password(this.body.password);
    }

    /**
     * @desc This function is being used to validate OTP request
     * @author Growexx
     * @since 27/03/2021
     */
    otpValidate () {
        super.email(this.body.email);
        super.otp(this.body.otp);
    }
}

module.exports = SignUpValidator;
