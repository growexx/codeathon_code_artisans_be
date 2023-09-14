const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const Openai = require('../../../util/openaiConfig');
const sinon = require('sinon');
chai.use(chaiHttp);

describe('Generate text', () => {
    try {

        it('should not generate text if error occur', (done) => {;
            const prompt = {
                'prompt': 'Once upon a time...'
            }
            const response = {
                data: {
                    choices: [
                        {
                            message: {
                                content: 'Once upon a time, there was a magical land...',
                            },
                        },
                    ],
                },
            };
            const mockError = new Error('Error calling api');
            const createChatCompletionStub = sinon.stub(Openai, 'createChatCompletion').throws(mockError);
            request(process.env.BASE_URL)
                .post('/auth/text-generator')
                .send(prompt)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 0);
                    createChatCompletionStub.restore();
                    done();
                });
        });

        it('should generate text successfully', (done) => {;
            const prompt = {
                'prompt': 'Once upon a time...'
            }
            const response = {
                data: {
                    choices: [
                        {
                            message: {
                                content: 'Once upon a time, there was a magical land...',
                            },
                        },
                    ],
                },
            };
            const createChatCompletionStub = sinon.stub(Openai, 'createChatCompletion').returns(response);
            request(process.env.BASE_URL)
                .post('/auth/text-generator')
                .send(prompt)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 1);
                    createChatCompletionStub.restore();
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
