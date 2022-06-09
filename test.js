const nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '9386be060e523f',
        pass: 'c70f4d99d9500c',
    },
});

const sendMail = (subject, text, link) => {
    message = {
        from: 'from-example@email.com',
        to: 'to-example@email.com',
        subject: subject,
        // text: text,
        html: `<h1>${text}</h1><a href="${link}">Click here to reset password</a>`,
    };
    transport.sendMail(message, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

// sendMail('test', 'hi');
module.exports = sendMail;
