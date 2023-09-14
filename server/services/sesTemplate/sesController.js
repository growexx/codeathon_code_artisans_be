const SesTemplateService = require('./sesService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for ses template.
 */
class SesTemplateController {
    /**
     * @desc This function is being used to create template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     * @param {Object} res Response
     */

    static async createTemplate (req, res) {
        try {
            const data = await SesTemplateService.createTemplate(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res);
        }
    }

    /**
     * @desc This function is being used to retriving template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     * @param {Object} res Response
     */

    static async getTemplate (req, res) {
        try {
            const data = await SesTemplateService.getTemplate(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res);
        }
    }
    /**
     * @desc This function is being used to delete template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     * @param {Object} res Response
     */
    static async deleteTemplate (req, res) {
        try {
            const data = await SesTemplateService.deleteTemplate(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res);
        }
    }

    /**
     * @desc This function is being used to update template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     * @param {Object} res Response
     */

    static async updateTemplate (req, res) {
        try {
            const data = await SesTemplateService.updateTemplate(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res);
        }
    }
}

module.exports = SesTemplateController;
