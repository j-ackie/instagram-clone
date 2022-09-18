import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./api/route.js";

const app = express();

app.use(cors({
    origin: "https://instagram-clone-j-ackie.vercel.app",
    credentials: true
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use("/api/v1", router);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;