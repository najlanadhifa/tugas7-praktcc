import express from "express";
import { getNotes, getNotesbyId, createNote, updateNote, deleteNote } from "../controllers/NoteController.js";

const router = express.Router();    

router.get("/notes", getNotes);
router.get("/notes/:id", getNotesbyId);
router.post("/notes", createNote);
router.patch("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

export default router;