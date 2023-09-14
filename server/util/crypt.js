const crypto = require('crypto');
// Must be 256 bytes (32 characters)
const ENCRYPTION_KEY = process.env.JWT_SECRET;
const JWT = require('./jwt');

class Crypt {
    static enCryptPassword (password) {
        return new Promise((resolve) => {
            const iv = crypto.randomBytes(CONSTANTS.IV_LENGTH);
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            let encrypted = cipher.update(password);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            resolve((`${iv.toString('hex')}:${encrypted.toString('hex')}`));
        });
    }

    static async comparePassword (compare, original) {
        const textParts = original.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return (compare === (decrypted.toString()));
    }

    /**
     * This function is being used to save user detail before login
     * @author Growexx
     * @param {Object} user user
     * @param {function} callback callback
     * @since 01/03/2021
     */
    static async getUserToken (user) {
        const token = JWT.generate({
            id: user._id,
            email: user.email,
            role: user.role
        });

        return {
            token
        };
    }
}

module.exports = Crypt;
