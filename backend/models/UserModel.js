import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

// Membuat tabel "user"
const User = db.define(
  "user", // Nama Tabel
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT
  }, {
    freezeTableName: true
  }
);

db.sync().then(() => console.log("Database synced"));

export default User;