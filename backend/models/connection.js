const Sequelize = require("sequelize");

//CONNECTING TO LOCAL DB
const connectDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "192.168.1.7",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

const db = {};
db.connectDB = connectDB;

//CREATING MODELS IN OUR LOCAL SERVER
db.User = require("./userModel.js")(connectDB);
db.Role = require("./roleModel.js")(connectDB);
db.UserRole = require("./userRoleModel.js")(connectDB);

db.User.belongsToMany(db.Role, {
  through: db.UserRole,
  foreignKey: "user_uuid",
});
db.Role.belongsToMany(db.User, {
  through: db.UserRole,
  foreignKey: "role_uuid",
});

//SYNCING IT WITH OUR DB
const check = async () => {
  try {
    await connectDB.authenticate();
    console.log("Connection has been established successfully.");
    await db.connectDB.sync({ force: false });
    // await db.Role.create({ roleName: "Customer" });
    // await db.Role.create({ roleName: "Restaurant Owner" });
    // await db.Role.create({ roleName: "Delivery Partner" });
    // await db.Role.create({ roleName: "Admin" });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { db, check };
