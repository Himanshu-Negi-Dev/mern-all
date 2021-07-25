const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendEmail = async (to, subject, html, cb) => {
  const mailOptions = {
    from: "himanshu.dev7350@gmail.com",
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendEmail;
