const nodemailer = require("nodemailer");
require("dotenv").config();
const transport = nodemailer.createTransport({
  service: "Mailgun",
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject)=> {
      transport.sendMail({from, to, subject, html}, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  }
};

