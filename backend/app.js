const { logger, customFormat } = require("./customLogger.js");
const CustomError = require("./utils/customError.js");
const GlobalErrorHandler = require("./utils/globalErrorHandler.js");
const userRoute = require("./features/users/userApi.js");
const authRoute = require("./features/authentication/authApi.js");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const forge = require("node-forge");
const fs = require("fs");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    // origin: "http://192.1.200.113:8080",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(
  morgan(customFormat, {
    stream: {
      write: (message) => {
        console.log(message);

        const [method, url, status, responseSize, responseTime] =
          message.split(" ");

        let logLevel;
        const statusCode = +status;

        if (statusCode >= 400 && statusCode < 500) logLevel = "error";
        else if (statusCode >= 500) logLevel = "warn";
        else logLevel = "info";

        const logObject = {
          method,
          url,
          status,
          responseSize,
          responseTime,
        };

        logger[logLevel](JSON.stringify(logObject));
      },
    },
  })
);

const generateKeys = () => {
  const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);

  // Export the keys to PEM format
  const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
  const privateKeyPem = forge.pki.privateKeyToPem(privateKey);

  // Storing the keys
  fs.writeFileSync("public_key.pem", publicKeyPem, "utf8");
  fs.writeFileSync("private_key.pem", privateKeyPem, "utf8");
};

// Check if the keys already exist
if (!fs.existsSync("public_key.pem") || !fs.existsSync("private_key.pem")) {
  generateKeys(); // Generate keys if they don't exist
}

app.use((req, res, next) => {
  req.requestedAt = new Date().toLocaleString();
  next();
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next) => {
  next(new CustomError(`Can't find the ${req.url} on the server!`, 404));
});

app.use(GlobalErrorHandler);

module.exports = app;
