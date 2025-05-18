import express from "express";
import {
    getNotes, 
    getNotesbyId,
    createNote,
    updateNote,
    deleteNote,
    login, 
    logout,
} from "../controllers/NoteController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getAccessToken} from "../controllers/TokenController.js";

const router = express.Router();

// Endpoint buat ngambil access token menggunakan refresh token
router.get("/token", getAccessToken);

// Endpoint buat login & logout
router.post("/login", login);
router.delete("/logout", logout);

// Endpoint CRUD users
// Kita mau endpoint ini tu restricted,
// alias user yg mau akses endpoint ini harus login dulu,
// makanya kita kasih middleware fungsi verifyToken yg udah kita buat sebelumnya.
router.get("/notes", verifyToken, getNotes);
router.get("/notes/:id", verifyToken, getNotesbyId);
router.post("/notes", createNote);
router.patch("/notes/:id", verifyToken, updateNote);
router.delete("/notes/:id", verifyToken, deleteNote);

export default router;