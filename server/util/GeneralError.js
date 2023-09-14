
/**
 * This class reprasents common utilities for application
 */
class GeneralError extends Error {
    constructor (message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = GeneralError;
