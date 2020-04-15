const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: 'postmaster@sandbox769574dbfb90412191868b22e311f207.mailgun.org',
        pass: '721baca1c7009c27f8a83442804e273f-46ac6b00-371725f9'
    },
    tls: {
        rejectUnauthorized: false
    }
});
module.exports = transport;