const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseSignin');
chai.use(chaiHttp);
const trueDataStatus = 1;

describe('Signin Account', () => {
    try {
        TestCase.signinAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/signin')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should validate if email is not registered', (done) => {
            const loginUser = {
                'email': 'john1@mailinator.com',
                'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d'
            };
            request(process.env.BASE_URL)
                .post('/auth/signin')
                .send(loginUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 0);
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        it('As a user, I should validate if invalid password', (done) => {
            const loginUser = {
                'email': 'super@mailinator.com',
                'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d'
            };
            request(process.env.BASE_URL)
                .post('/auth/signin')
                .send(loginUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 0);
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        it('As a user, I should validate if valid password but user is not active', (done) => {
            const loginUser = {
                'email': 'inactive@mailinator.com',
                'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/auth/signin')
                .send(loginUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 0);
                    assert.equal(res.statusCode, 423);
                    done();
                });
        });

        it('As a user, I should validate and login with correct credentials', (done) => {
            const loginUser = {
                'email': 'user@mailinator.com',
                'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/auth/signin')
                .send(loginUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    expect(res.body.data.token).to.be.a('string');
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a admin, I should validate and login', (done) => {
            const loginUser = {
                email: 'super@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/auth/signin')
                .send(loginUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    expect(res.body.data.token).to.be.a('string');
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
