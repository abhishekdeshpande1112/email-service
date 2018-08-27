const assert = require('assert');
const nock = require('nock');

const {sendEmail} = require('../services/emailService');
const {HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_ACCEPTED, HTTP_STATUS_CODE_UNAUTHORIZED,
       HTTP_STATUS_CODE_FORBIDDEN, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_INTERNAL_SERVER
} = require('../lib/constants');

describe('emailService', () => {
    let body;
    beforeEach(() => {
        body = {
            "email":"abhishekdeshpande@xyz.com",
            "emailCc":"testcc@xyz.com,testcc@pqr.com",
            "emailBcc":"testbcc@xyz.com",
            "subject":"Test Subject",
            "content":"Test Content"
        }
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should send email when valid input payload', async () => {
        nock('https://api.sendgrid.com/v3/mail/send').post('').reply(HTTP_STATUS_CODE_OK);

        const response = await sendEmail(body, 'sendgrid', true);
        assert.equal(response.statusCode, HTTP_STATUS_CODE_OK);

    });

    it('return 400 when email provider throws bad request', async () => {
            const errorsBody = {
                errors: [{ message: 'Does not contain a valid address.',
                          field: 'personalizations.0.to.0.email'}]
            }
            nock('https://api.sendgrid.com/v3/mail/send').post('').reply(HTTP_STATUS_CODE_BAD_REQUEST, errorsBody);

            const response = await sendEmail(body, 'sendgrid', true);
            assert.equal(response.statusCode, HTTP_STATUS_CODE_BAD_REQUEST);
            const messages = JSON.parse(response.body).message;
            assert.equal(messages[0], 'Does not contain a valid address.');
        });

    it('return 500 when api_key of email provider is invalid or expired', async () => {
        nock('https://api.sendgrid.com/v3/mail/send').post('').reply(HTTP_STATUS_CODE_UNAUTHORIZED, {});

        const response = await sendEmail(body, 'sendgrid', true);
        assert.equal(response.statusCode, HTTP_STATUS_CODE_INTERNAL_SERVER);
        const message = JSON.parse(response.body).message;
        assert.equal(message, 'No access to Email Service for sendgrid');
    });

    it.only('send email with secondary email provider if fallback with primary email provider', async () => {
        nock('https://api.sendgrid.com/v3/mail/send').post('').reply(HTTP_STATUS_CODE_INTERNAL_SERVER, {});
        nock('https://api.mailgun.net/v3/sandboxe259ba2931c1429e81caa9c1d48a579e.mailgun.org/messages').post('').reply(HTTP_STATUS_CODE_ACCEPTED);
        const response = await sendEmail(body, 'sendgrid', true);
        assert.equal(response.statusCode, HTTP_STATUS_CODE_OK);
    });
});
