const isPresent = (value) => {
  return value !== undefined && value !== null;
}

const personalization = (payload) => {
    const emailToArray = payload.email && payload.email.split(',');
    const emailToObjectArray = emailToArray && emailToArray.map(emailTo => {return {email:emailTo}});
    const emailCcArray = payload.emailCc && payload.emailCc.split(',');
    const emailCcObjectArray = emailCcArray && emailCcArray.map(emailCc => {return {email:emailCc}})
    const emailBccArray = payload.emailBcc && payload.emailBcc.split(',');
    const emailBccObjectArray = emailBccArray && emailBccArray.map(emailBcc => {return {email:emailBcc}})

    return {
        to: emailToObjectArray,
        ...(payload.emailCc)? {cc: emailCcObjectArray}: {},
        ...(payload.emailBcc)? {bcc: emailBccObjectArray}: {}
    };
}

const sendGridRequest = (payload) => {
    return !payload ? {} : JSON.stringify({
        personalizations: [personalization(payload)],
        from: {
            email: 'info@donotreplytouser.com'
        },
        subject: payload.subject,
        content: [{type: 'text/plain', value: payload.content}]
    });
}

const mailGunRequest = (payload) => {
    const transformedPayload = !payload ? '': {
        from: 'info@donotreplytouser.com',
        to: payload.email,
        subject: payload.subject,
        text: payload.content,
        ...(payload.emailCc)? {cc: payload.emailCc}: {},
        ...(payload.emailBcc)? {bcc: payload.emailBcc}: {}
    };

    return Object.keys(transformedPayload).map((key) => {
        return key + '=' + transformedPayload[key];
    }).join('&');
}

const requestTransform = (payload, provider) => {
    return 'sendgrid' === provider? sendGridRequest(payload): mailGunRequest(payload);
}

module.exports = {requestTransform}