import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "user"
const User = db.define(
  "user", // Nama Tabel
  {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    refresh_token: Sequelize.TEXT
  }, {
    freezeTableName: true
  }
);

db.sync().then(() => console.log("Database synced"));

export default User;