import express from "express";
import { getUsers, createUser, updateUser, deleteUser, getUserById, loginHandler, logout, } from "../controllers/UserController.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/token", refreshToken);
router.post("/login", loginHandler);
router.delete("/logout", logout);

router.post("/register", createUser); 
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/edit-user/:id", verifyToken, updateUser);
router.delete("/delete-user/:id", deleteUser);

export default router;