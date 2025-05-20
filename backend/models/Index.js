import db from "../config/Database.js";
import User from "./UserModel.js";
import Notes from "./NotesModel.js";

// Relasi
User.hasMany(Notes, { foreignKey: "userId", onDelete: "CASCADE" });
Notes.belongsTo(User, { foreignKey: "userId" });

// Sinkronisasi semua tabel
(async () => {
  try {
    await db.authenticate();
    console.log("Koneksi database berhasil!");

    await db.sync({ alter: true });
    console.log("Semua tabel berhasil disinkronisasi.");
  } catch (err) {
    console.error("Gagal konek DB:", err);
  }
})();

export { User, Notes };