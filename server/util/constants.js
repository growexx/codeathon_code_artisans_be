module.exports = {
    // For AES, this is always 16
    IV_LENGTH: 16,
    LOG_LEVEL: 'debug',
    PROFILE_PICTURE: {
        MIN_SIZE: 5120,
        MAX_SIZE: 5242880,
        ALLOWED_TYPE: ['image/jpg', 'image/jpeg', 'image/png']
    },
    USER_DOCUMENT_FILE: {
        MIN_SIZE: 10240,
        MAX_SIZE: 5242880,
        ALLOWED_TYPE: ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']
    },
    REGEX: {
        EMAIL: /^[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/,
        FIRSTNAME: /^[a-zA-Z0-9,'~._^ -]*$/,
        SURNAME: /^[a-zA-Z0-9,'~._^ -]*$/,
        ALPHA_ONLY: /^[a-zA-Z']*$/,
        ALPHA_SPECIAL_CHAR: /^[ A-Za-z0-9_@./#&+-]*$/,
        ALPHA_SPECIAL_CHAR_EXCEPT_NUMBER: /^[ A-Za-z_@./#&+-]*$/,
        FULL_ACCESS: /^[^<> ?//\\]+$/,
        ALPHA_NUMARIC: /^[\w@ ]+$/,
        templateName: /^[ A-Za-z0-9_@./#&+-]*$/,
        SUBJECT: /^[ A-Za-z0-9_@./#&+-]*$/,
        URL: /(http(s)?:\/\/www\.)?[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%+.~#?&//=]*)/
    },
    OTPLENGTH: 6,
    STATUS: {
        PENDING: 0,
        ACTIVE: 1
    },
    ENVIRONMENT: {
        TESTING: 'testing',
        LOCAL: 'local',
        DEV: 'dev',
        PRODUCTION: 'production'
    },
    DEVELOPERS_EMAIL: 'info@Growexx.com',
    SES_HOST: 'email-smtp.eu-west-1.amazonaws.com',
    ROLE: {
        USER: 1,
        ADMIN: 4
    }
};
