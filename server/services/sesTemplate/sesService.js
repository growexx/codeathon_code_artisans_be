const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const SesValidator = require('./sesValidator');
const SES = require('../../util/ses');

/**
 * Class represents services for Ses template.
 */
class SesTemplateService {
    /**
     * @desc This function is being used to create template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     */

    static async createTemplate (req, locale) {
        try {
            const Validator = new SesValidator(req.body, locale);
            Validator.validateTemplateName();
            Validator.validateSubject();
            let htmlMessage;

            if (req.file !== undefined) {
                htmlMessage = req.file.buffer.toString('utf8');
            } else if (process.env.NODE_ENV !== 'testing') {
                htmlMessage = await readFileAsync(
                    `emailTemplates/${_.camelCase(req.body.templateName)}`,
                    'utf8'
                );
            }
            const params = {
                Template: {
                    TemplateName: req.body.templateName,
                    HtmlPart: htmlMessage,
                    SubjectPart: req.body.subject
                }
            };
            await SES.createTemplate(params);
        } catch (err) {
            if (err.code === 'ENOENT') {
                throw {
                    message: MESSAGES.FILE_NOT_FOUND,
                    statusCode: 400
                };
            } else {
                throw err;
            }
        }
    }

    /**
     * @desc This function is being used to retrieving template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     */

    static async getTemplate (req, res) {
        const Validator = new SesValidator(req.query, res);
        Validator.validateTemplateName();
        const params = {
            TemplateName: req.query.templateName
        };
        const getTemplateData = await SES.getTemplate(params);
        return { template: getTemplateData.Template };
    }
    /**
     * @desc This function is being used to delete template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     */
    static async deleteTemplate (req, res) {
        const Validator = new SesValidator(req.query, res);
        Validator.validateTemplateName();
        const params = {
            TemplateName: req.query.templateName
        };
        await SES.deleteTemplate(params);
    }

    /**
     * @desc This function is being used to update template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     */

    static async updateTemplate (req, res) {
        const Validator = new SesValidator(req.body, res);
        Validator.validateTemplateName();
        Validator.validateSubject();
        let htmlMessage;
        if (req.file !== undefined) {
            htmlMessage = req.file.buffer.toString('utf8');
        }
        const params = {
            Template: {
                TemplateName: req.body.templateName,
                HtmlPart: htmlMessage,
                SubjectPart: req.body.subject
            }
        };
        await SES.updateTemplate(params);
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            throw {
                message: MESSAGES.FILE_NOT_FOUND,
                statusCode: 400
            };
        } else {
            throw err;
        }
    }
}
module.exports = SesTemplateService;


