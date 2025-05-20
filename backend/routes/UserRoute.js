import express from "express";
import { getNotes, getNotesbyId, createNote, updateNote, deleteNote } from "../controllers/NoteController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { Register, Login, refreshToken, logout } from "../controllers/UserController.js";

const router = express.Router();    

router.get("/notes", verifyToken, getNotes);
router.get("/notes/:id", verifyToken, getNotesbyId);
router.post("/notes", verifyToken, createNote);
router.patch("/notes/:id", verifyToken, updateNote);
router.delete("/notes/:id", verifyToken, deleteNote);

// User Routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

export default router;