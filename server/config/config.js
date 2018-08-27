

const dev = {
    sendgrid: {
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`
        }
    },
    mailgun: {
        url: 'https://api.mailgun.net/v3/sandboxe259ba2931c1429e81caa9c1d48a579e.mailgun.org/messages',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': `Basic ${process.env.MAILGUN_API_KEY}`
        }
    },
    primaryProvider: 'sendgrid',
    secondaryProvider: 'mailgun'
};

const test = {
};

const config = {
    dev,
    test
};

module.exports = config[process.env.NODE_ENV];