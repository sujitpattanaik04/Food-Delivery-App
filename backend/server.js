const connection = require("./models/connection.js");

// CONNECT TO DATABASE
connection.check();

const app = require("./app");

const port = process.env.PORT || 3000;

// Create Server
const server = app.listen(process.env.SERVER_PORT, () => {
  console.log("server has started...");
  console.log(`Server is listening on port ${process.env.PORT}`);
});
