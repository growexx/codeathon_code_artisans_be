const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./userProfile');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};

// Invalid Token
const invalidToken = {
    token: ''
};

// Invalid
const invaliduser = {
    id: '5f083c352a7908662c334531',
    email: 'user@mailinator.com'
};
const requestPayloadInvalid = {
    token: jwt.sign(invaliduser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Inactive
const inactiveUser = {
    id: '5f083c352a7908662c334535',
    email: 'inactive@mailinator.com'
};
const requestPayloadInactive = {
    token: jwt.sign(inactiveUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// User Token
const user = {
    id: '5f083c352a7908662c334532',
    email: 'user@mailinator.com'
};
const requestPayloadUser = {
    token: jwt.sign(user, process.env.JWT_SECRET, tokenOptionalInfo)
};


describe('User Profile get', () => {
    try {
        it('Check invalid token ', (done) => {
            request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: invalidToken.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });
        it('Check invalid user', (done) => {
            request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: requestPayloadInvalid.token })
                .end((err, res) => {

                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        it('Get inactive user details', (done) => {
            request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: requestPayloadInactive.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 423);
                    done();
                });
        });

        it('Get user details', (done) => {
            request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: requestPayloadUser.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('User Profile Picture', () => {
    try {
        // Check all validation;
        TestCase.uploadProfilePicture.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/user/picture')
                    .set({ Authorization: requestPayloadUser.token })
                    .attach('doc', data.options.doc)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should not be able to invalid profile picture', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/picture')
                .set({ Authorization: requestPayloadUser.token })
                .attach('photo', 'test/mock-data/TEST.pdf');
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should not be upload valid file with less than 5 kb', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/picture')
                .set({ Authorization: requestPayloadUser.token })
                .attach('photo', 'test/mock-data/3kb_file.png');
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });



        it('As a user, I should not be upload valid file with more than 5 mb', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/picture')
                .set({ Authorization: requestPayloadUser.token })
                .attach('photo', 'test/mock-data/5_8mb_file.jpeg');
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should upload valid file for user profile', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/picture')
                .set({ Authorization: requestPayloadUser.token })
                .attach('photo', 'test/mock-data/valid_profile_pic.jpg');
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to delete uploaded file', async () => {
            const res = await request(process.env.BASE_URL)
                .delete('/user/picture')
                .set({ Authorization: requestPayloadUser.token });
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('User Profile password change', () => {
    try {
        // Check all validation;
        TestCase.changePassword.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/user/password')
                    .set({ Authorization: requestPayloadUser.token })
                    .attach('doc', data.options.doc)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('Check invalid existing password', async () => {
            const data = {
                oldPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d',
                newPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            const res = await request(process.env.BASE_URL)
                .put('/user/password')
                .set({ Authorization: requestPayloadUser.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });

        it('Change user password', async () => {
            const data = {
                oldPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
                newPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            const res = await request(process.env.BASE_URL)
                .put('/user/password')
                .set({ Authorization: requestPayloadUser.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
