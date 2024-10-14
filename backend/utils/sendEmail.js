const nodemailer = require("nodemailer");

// CREATE A TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "Gmail",
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  auth: {
    user: "sujit.pattanaik@argusoft.in",
    pass: "zepk rles rmrc iimd",
  },
});

const sendEmail = async (option) => {
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
