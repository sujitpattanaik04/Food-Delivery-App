const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiryTime = Date.now() + 10 * 60 * 1000;
  return { otp, expiryTime };
};

const validateOtp = (userOtp, savedOtp, expiryTime) => {
  const currentTime = Date.now();
  if (currentTime > expiryTime) {
    return { isValid: false, message: "OTP has expired !!" };
  } else if (userOtp !== savedOtp) {
    return { isValid: false, message: "OTP is Invalid !!" };
  } else {
    return { isValid: true, message: "OTP is Valid." };
  }
};

module.exports = { generateOtp, validateOtp };
