const express = require('express');
const mailRouter = express.Router();
const config = require('../config/config');
const {sendEmail} = require('../services/emailService');

mailRouter.post('/mail', async (req, res) => {
    const response = await sendEmail(req.body, config.primaryProvider, true);
    return res.status(response.statusCode).json(response.body);
});

module.exports = mailRouter;