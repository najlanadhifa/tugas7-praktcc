import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

// Membuat tabel "user"
const User = db.define(
  "user", // Nama Tabel
  {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    refresh_token: Sequelize.TEXT
  }, {
    freezeTableName: true
  }
);

db.sync().then(() => console.log("Database synced"));

export default User;