
const request = require('supertest');
const app = require('../server/server');
request(app);
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../server/models/user.model');
const UserSeed = require('./seed/user.seed');
const Crypt = require('../server/util/crypt');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);

describe('Data seeding', () => {
    it('Add user data', async () => {
        try {
            // sha of Test@123
            const hash = '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e';
            const user = await Promise.all(
                UserSeed.users.map(async (user)=>{
                    user.password = await Crypt.enCryptPassword(hash);
                    return user;
                }));
            await User.insertMany(user);
        } catch (error) {
            assert.equal(null, error);
        }
    });

    it('Check server root url', async () => {
        try {
            request(process.env.BASE_URL)
                .get('/')
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 'ok');
                });
        } catch (error) {
            assert.equal(null, error);
        }
    });
});
