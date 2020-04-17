const nodemailer = require("nodemailer");
require("dotenv").config();
const transport = nodemailer.createTransport({
  service: "Mailgun",
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
module.exports = transport;
