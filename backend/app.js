const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const { logger, customFormat } = require("./customLogger.js");
const connection = require("./models/connection.js");

const userRoute = require("./features/users/userApi.js");
const authRoute = require("./features/authentication/authApi.js");

const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(
  morgan(customFormat, {
    stream: {
      write: (message) => {
        const [method, url, status, responseSize, responseTime] =
          message.split(" ");

        let logLevel;
        const statusCode = +status;

        if (statusCode >= 400 && statusCode < 500) logLevel = "warn";
        else if (statusCode >= 500) logLevel = "error";
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

connection.check();

app.use((req, res, next) => {
  req.requestedAt = new Date().toLocaleString();
  next();
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.all("*", (req, res) => {
  res.status(400).json({
    status: "failed",
    message: `Can't find the ${req.url} on the server!`,
  });
});

app.listen(process.env.PORT, () => {
  console.log("app is listening on port 3000!");
});
