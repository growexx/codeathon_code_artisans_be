const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseSesTemplate');
const sinon = require('sinon');
const SES = require('../../../util/ses');
chai.use(chaiHttp);

describe('Retrieving Template', () => {
    try {
        let sesGetTemplateStub;

        before(async () => {
            sesGetTemplateStub = sinon.stub(SES, 'getTemplate');
        });

        after(async () => {
            sesGetTemplateStub.restore();
        });

        TestCase.retrievingTemplate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .get('/template/')
                    .query(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should abe to access existing template', (done) => {
            sesGetTemplateStub.returns({ Template: 'template' });

            const template = {
                templateName: 'myFile'
            };

            request(process.env.BASE_URL)
                .get('/template/')
                .query(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 200);
                    done();
                });

        });

        it('As a user, I should not able to access existing template', (done) => {
            sesGetTemplateStub.throws();
            const template = {
                templateName: 'myFile'
            };

            request(process.env.BASE_URL)
                .get('/template/')
                .query(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Update Template', () => {
    try {
        let sesUpdateTemplateStub;

        before(async () => {
            sesUpdateTemplateStub = sinon.stub(SES, 'updateTemplate');
        });

        after(async ()=> {
            sesUpdateTemplateStub.restore();
        });

        TestCase.updateTemplate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/template/')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should abe to access existing template', (done) => {
            sesUpdateTemplateStub.returns();

            const template = {
                templateName: 'myFile',
                subject: 'abc'
            };

            request(process.env.BASE_URL)
                .put('/template/')
                .send(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user, I should not able to access existing template', (done) => {
            sesUpdateTemplateStub.throws();
            const template = {
                templateName: 'myFile'
            };

            request(process.env.BASE_URL)
                .put('/template/')
                .query(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Create Template', () => {
    try {
        let sesCreateTemplateStub;

        before(async () => {
            sesCreateTemplateStub = sinon.stub(SES, 'createTemplate');
        });

        after(async ()=> {
            sesCreateTemplateStub.restore();
        });

        TestCase.createTemplate.forEach((data) => {
            it('Template Created ', (done) => {
                request(process.env.BASE_URL)
                    .post('/template/')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should able to create template', (done) => {
            sesCreateTemplateStub.returns();
            const template = {
                templateName: 'myFile',
                subject: 'abc'
            };

            request(process.env.BASE_URL)
                .post('/template/')
                .send(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user, I should not able to create template', (done) => {
            sesCreateTemplateStub.throws();
            const template = {
                templateName: 'myFile',
                subject: 'abc'
            };

            request(process.env.BASE_URL)
                .post('/template/')
                .send(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Delete Template', () => {
    try {
        let sesDeleteTemplateStub;

        before(async () => {
            sesDeleteTemplateStub = sinon.stub(SES, 'deleteTemplate');
        });

        after(async ()=> {
            sesDeleteTemplateStub.restore();
        });

        TestCase.deleteTemplate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/template/')
                    .query(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should able to delete existing template', (done) => {
            sesDeleteTemplateStub.returns();
            sesDeleteTemplateStub.returns();
            const template = {
                templateName: 'myFile'
            };

            request(process.env.BASE_URL)
                .delete('/template/')
                .query(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user, I should not able to delete existing template', (done) => {
            sesDeleteTemplateStub.throws();
            const template = {
                templateName: 'myFile'
            };

            request(process.env.BASE_URL)
                .delete('/template/')
                .query(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
