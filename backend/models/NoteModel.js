import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Notes = db.define('notes', // Nama Tabel
  { 
    nama: DataTypes.STRING,
    judul: DataTypes.STRING,
    isi: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }
);

db.sync().then(() => console.log("Database synced"));

export default Notes;