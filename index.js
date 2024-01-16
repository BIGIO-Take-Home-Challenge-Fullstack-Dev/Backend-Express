import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import ChapterRoute from "./routes/ChapterRoute.js"
import StoryRoute from "./routes/StoryRoute.js"

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));


app.use(ChapterRoute);
app.use(StoryRoute);

app.listen(5000, ()=> console.log("Server Sedang berjalan di http://localhost:5000"));