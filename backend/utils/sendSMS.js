const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (body) => {
  const smsOptions = {
    from: process.env.TWILIO_FROM_NUMBER,
    to: process.env.TWILIO_TO_NUMBER,
    subject: "Your OTP Code for FooDelivery",
    body,
  };

  try {
    const msg = await client.messages.create(smsOptions);
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
  }
};

module.exports = sendSMS;
