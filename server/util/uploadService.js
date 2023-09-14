const AWS = require('aws-sdk');
const Constants = require('../util/constants');
const s3 = new AWS.S3({
    Bucket: Constants.AWS_S3_PUBLIC_BUCKET
});

class UploadService {
    static async uploadFile (file, filename) {
        const data = {
            Key: filename,
            Bucket: Constants.AWS_S3_PUBLIC_BUCKET,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        if (process.env.NODE_ENV !== 'testing') {
            return await s3.putObject(data).promise();
        } else {
            return Promise.resolve();
        }
    }

    static async deleteObject (filename) {
        const data = {
            Key: filename,
            Bucket: Constants.AWS_S3_PUBLIC_BUCKET
        };
        if (process.env.NODE_ENV !== 'testing') {
            return await s3.deleteObject(data).promise();
        } else {
            return Promise.resolve();
        }
    }
}

module.exports = UploadService;
