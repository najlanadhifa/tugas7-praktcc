import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Notes = db.define('notes', // Nama Tabel
  { 
    nama: DataTypes.STRING,
    judul: DataTypes.STRING,
    isi: DataTypes.STRING,
  }, {
    freezeTableName: true
  });

  export default Notes;

(async()=>{
    await db.sync();
})();