const validation = require('../../util/validation');

/**
 * Class represents validations for user Basic Profile.
 */
class UserProfileValidator extends validation {
    constructor (body) {
        super(body);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate user profile picture
     * @author Growexx
     * @since 01/03/2021
     */
    async validationProfilePicture () {
        await this.fileType(this.body.mimetype);
        await this.fileSize(this.body.size);
    }

    /**
     * @desc This function is being used to validate user profile picture fileType
     * @author Growexx
     * @since 01/03/2021
     * @param {String} mimeType mimeType
     */
    async fileType (mimeType) {
        if (!mimeType || CONSTANTS.PROFILE_PICTURE.ALLOWED_TYPE.indexOf(mimeType) === -1) {
            throw {
                message: MESSAGES.INVALID_REQUEST,
                statusCode: 400
            };
        }
    }

    /**
     * @desc This function is being used to validate user profile picture file size in bytes
     * @author Growexx
     * @since 01/03/2021
     * @param {Number} fileSize fileSize
     */
    async fileSize (fileSize) {
        if (!fileSize
            || fileSize < CONSTANTS.PROFILE_PICTURE.MIN_SIZE
            || fileSize > CONSTANTS.PROFILE_PICTURE.MAX_SIZE) {
            throw {
                message: MESSAGES.INVALID_REQUEST,
                statusCode: 400
            };
        }
    }
}

module.exports = UserProfileValidator;
