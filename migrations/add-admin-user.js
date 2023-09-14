module.exports = {
    async up (db) {
        const Crypt = require('../server/util/crypt');
        global.CONSTANTS = require('../server/util/constants');
        await db.collection('users').insertOne({
            email: 'super@mailinator.com',
            // SHA of Test@123
            password: await Crypt.enCryptPassword('8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'),
            role: 4,
            isActive: 1,
            firstName: 'Test',
            lastName: 'Admin'
        });
    }
};
