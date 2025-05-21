import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import NotesRoute from "./routes/NoteRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
app.set("view engine", "ejs");

dotenv.config();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://notes-fe-dot-mimetic-sweep-450606-j0.uc.r.appspot.com/"],
  })
);
app.get("/", (req, res) => res.render("index"));
app.use(express.json());
app.use(NotesRoute, UserRoute);

app.listen(5000, ()=> console.log('server berjalan ya ..'));