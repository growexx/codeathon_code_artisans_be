const mongoose = require('mongoose');
const User = require('../../models/user.model');
const UserBasicProfileValidator = require('./userProfileValidator');
const UploadService = require('../../util/uploadService');
const crypt = require('../../util/crypt');
const GeneralError = require('../../util/GeneralError');
var Client = require('ftp');
const pdf = require('pdf-parse');
var fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");


/**
 * Class represents services for user Basic Profile.
 */
class UserProfileService {

    static getPrompt (type) {
        switch (type) {
            case '1':
                return "Generate a comprehensive database schema, including tables, relationships, and data types for below data. Ensure that the schema is optimized for efficient querying and data retrieval: "
            case '2':
                return "Create unit test code for below data in javascript. Write test cases that cover different scenarios, including valid and invalid input, authentication failures, and edge cases: "
            case '3':
                return "Develop a controller code for below data in javascript. Ensure that the controller follows best practices for security and handles various error scenarios gracefully: "
            default:
                return "Please genarate Database schema, Unit test code & Controller code for below data: "
        }
    }

    static async extractTextFromPdf (pdfData) {
        const dataBuffer = Buffer.from(pdfData, 'base64');
        const data = await pdf(dataBuffer);
        return data.text;
    }

    static async uploadPDF (req) {
        const pdfText = await this.extractTextFromPdf(req.file.buffer);
        const prompt = this.getPrompt(req.body.type);

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `${prompt} ${pdfText}` }],
        })
        return { pdfText, answer: response.data.choices[0].message.content };
    }

    static async simpleText (req) {
        const input = req.body.text;

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
        })
        return { input, answer: response.data.choices[0].message.content };
    }

    /**
     * @desc This function is being used to get user details
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     * @param {function} next exceptionHandler
     */
    static async getUserDetails (user) {
        return user;
    }

    /**
     * @desc This function is being used to update user profile picture
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async updateProfilePicture (req, user) {
        const fileName = `${process.env.NODE_ENV}-proflie-pictures/${user._id}`;
        const Validator = new UserBasicProfileValidator(req.file);
        await Validator.validationProfilePicture();
        await UploadService.uploadFile(req.file, fileName);
        const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
        const updateData = {
            profilePicture: filePath
        };
        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            $set: updateData
        });

        return updateData;
    }

    /**
     * @desc This function is being used to connect ftp server
     * @author Growexx
     * @since 07/06/2022
     * @param {Object} res Response
     */
    static async ftpConnection () {
        var config = {
            host: process.env.FTP_HOST,
            port: parseInt(process.env.FTP_PORT),
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD
        };
        let c = new Client();
        const connectionPromise = new Promise((resolve, reject) => {
            try {
                c.connect(config);
                c.on('error', function (err) {
                    console.log('Error here', err);
                    reject(err);
                });
                c.on('ready', function () {
                    var isConnected = c.connected;
                    if (isConnected) {
                        resolve(c);
                    } else {
                        reject(false);
                    }
                });
            } catch (err) {
                reject(err.message);
            }
        });
        return connectionPromise;
    }

    /**
     * @desc This function is being used to upload file to ftp server
     * @author Growexx
     * @since 07/06/2022
     * @param {Object} req Request
     */
    static async ftpFileUpload (req) {
        let clientConn = await UserProfileService.ftpConnection();
        const ftpUploadPromise = new Promise((resolve, reject) => {
            clientConn.put(req.body.localFilePath, req.body.remoteFilePath, function (err) {
                if (err) reject(err.message);
                resolve(clientConn.end());
            });
        });
        return ftpUploadPromise;
    }

    /**
     * @desc This function is being used to download file from ftp server
     * @author Growexx
     * @since 07/06/2022
     * @param {Object} req Request
     */
    static async ftpFileDownload (req) {
        let clientConn = await UserProfileService.ftpConnection();
        const ftpDownloadPromise = new Promise((resolve, reject) => {
            clientConn.get(req.body.remoteFilePath, function (err, stream) {
                if (err) {
                    reject(err.message);
                } else {
                    stream.once('close', function () { clientConn.end(); });
                    stream.pipe(fs.createWriteStream(req.body.localFilePath));
                    resolve('Download successful');
                }
            });
        });
        return ftpDownloadPromise;
    }

    /**
     * @desc This function is being used to delete user profile picture
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async deleteProfilePicture (user) {
        const fileName = `${process.env.NODE_ENV}-proflie-pictures/${user._id}`;
        await UploadService.deleteObject(fileName);
        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                profilePicture: ''
            }
        });
    }

    /**
     * @desc This function is being used to change user password
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async changePassword (data, user, locale) {
        const Validator = new UserBasicProfileValidator(null, locale);
        Validator.password(data.oldPassword);
        Validator.password(data.newPassword);
        const userPassword = await User.findOne({ _id: user._id }, { _id: 0, password: 1 }).lean();

        const isMatch = await crypt.comparePassword(data.oldPassword, userPassword.password);
        if (!isMatch) {
            throw new GeneralError(locale('PASSWORD_NOT_MATCH'), 400);
        } else {
            const hash = await crypt.enCryptPassword(data.newPassword);
            await User.updateOne({ _id: user._id }, { $set: { password: hash } });
        }
    }
}

module.exports = UserProfileService;
