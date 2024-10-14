const forge = require("node-forge");
const fs = require("fs");

const decryptPassword = (password) => {
  // Load keys from files
  const privateKeyPem = fs.readFileSync("../backend/private_key.pem", "utf8");

  // Decode base64 to binary
  const encryptedBytes = forge.util.decode64(password);

  // Decrypt the data using private key
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

  password = privateKey.decrypt(encryptedBytes, "RSA-OAEP");

  return password;
};

module.exports = decryptPassword;
