import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import NotesRoute from "./routes/NoteRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;
app.set("view engine", "ejs");

dotenv.config();

const allowedOrigins = [
  "http://localhost:3000"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api", NotesRoute);
app.use(UserRoute);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, ()=> console.log('server berjalan ya ..'));