const config = require('../config/config');
const fetch = require('node-fetch');
const {requestTransform} = require('../lib/payload-transformer');
const {getSuccessResponse, getErrorResponse} = require('../lib/responses');
const {HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_ACCEPTED, HTTP_STATUS_CODE_UNAUTHORIZED,
       HTTP_STATUS_CODE_FORBIDDEN, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_INTERNAL_SERVER
} = require('../lib/constants');

const email = async (payload, provider) => {
    const url = config[provider].url;
    const headers = config[provider].headers;
    const body = requestTransform(payload, provider);
    return fetch(url, {method:'POST', headers, body});
}

const sendEmail = async(body, emailProvider, isRetryOnFallback) => {
    try{
        const response = await email(body, emailProvider);
        console.log('Response', response.status);

        const responseBody = [HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_ACCEPTED].includes(response.status)? {}: await response.json();
        switch (response.status) {
            case HTTP_STATUS_CODE_OK:
            case HTTP_STATUS_CODE_ACCEPTED:
                return getSuccessResponse();
            case HTTP_STATUS_CODE_BAD_REQUEST:
                const errors = responseBody.errors ?
                                        responseBody.errors.map(error => error.message): responseBody.message;
                return getErrorResponse(HTTP_STATUS_CODE_BAD_REQUEST, errors);
            case HTTP_STATUS_CODE_UNAUTHORIZED:
            case HTTP_STATUS_CODE_FORBIDDEN:
                // Can do a fallback to secondary email provider
                return getErrorResponse(HTTP_STATUS_CODE_INTERNAL_SERVER, `No access to Email Service for ${emailProvider}`);
            default:
                if(isRetryOnFallback) {
                    return await sendEmail(body, config.secondaryProvider, false);
                }
                return getErrorResponse(HTTP_STATUS_CODE_INTERNAL_SERVER, responseBody);
        }
    } catch (e) {
        console.log(e);
        if(isRetryOnFallback) {
            return await sendEmail(body, config.secondaryProvider, false);
        }
        return getErrorResponse(HTTP_STATUS_CODE_INTERNAL_SERVER, 'email', e);
    }
}

module.exports = {sendEmail}
