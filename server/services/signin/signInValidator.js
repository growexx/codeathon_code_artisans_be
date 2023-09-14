const validation = require('../../util/validation');

/**
 * Class represents validations for signin.
 */
class SignUpValidator extends validation {
    constructor (body, locale) {
        super(locale);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate request for sign in
     * @author Growexx
     * @since 01/03/2021
     */
    validate () {
        super.email(this.body.email);
        super.password(this.body.password);
    }
}

module.exports = SignUpValidator;
