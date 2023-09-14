/* eslint-disable eol-last */
/**
 * This file is used to Ses API's routes.
 * Created by Growexx on 26/05/2022.
 * @name sesRoutes
 */
const SesTemplateController = require('../services/sesTemplate/sesController');
const router = require('express').Router();
const UploadMiddleWare = require('../middleware/upload');



router.post('/', UploadMiddleWare.single('templateFile'), SesTemplateController.createTemplate);
router.get('/', SesTemplateController.getTemplate);
router.delete('/', SesTemplateController.deleteTemplate);
router.put('/', UploadMiddleWare.single('templateFile'), SesTemplateController.updateTemplate);

module.exports = router;
