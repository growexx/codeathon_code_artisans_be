
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1', apiVersion: '2010-12-01' });

class SES {
    static async createTemplate (params) {
        return new Promise((resolve, reject) => {
            ses.createTemplate(params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    static async getTemplate (params) {
        return new Promise((resolve, reject) => {
            ses.getTemplate(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    static async deleteTemplate (params) {
        return new Promise((resolve, reject) => {
            ses.deleteTemplate(params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    static async updateTemplate (params) {
        return new Promise((resolve, reject) => {
            ses.updateTemplate(params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = SES;

