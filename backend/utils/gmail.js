const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  // CREATE A TRANSPORTER
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sujit.pattanaik@argusoft.in",
      pass: "zepk rles rmrc iimd",
    },
  });

  // DEFINE EMAIL OPTIONS
  const emailOptions = {
    from: "Food Delivery Team<support@foodelivery.com>",
    to: option.to,
    subject: option.subject,
    link: option.link,
    html: option.html,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
