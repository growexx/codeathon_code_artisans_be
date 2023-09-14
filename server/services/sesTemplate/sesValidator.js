const validation = require('../../util/validation');
/**
 * Class represents validations for template.
 */
class SesValidator extends validation {
    constructor (body, locale) {
        super(locale);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate template name .
     * @author Growexx
     * @since 26/05/2022
     */
    validateTemplateName () {
        super.templateName(this.body.templateName);
    }

    /**
     * @desc This function is being used to validate template subject .
     * @author Growexx
     * @since 26/05/2022
     */

    validateSubject () {
        super.subject(this.body.subject);
    }
}
module.exports = SesValidator;

