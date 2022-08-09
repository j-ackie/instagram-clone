import express from "express";
import cors from "cors";
import router from "./api/route.js"

const app = express();


app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use("/api/v1/posts", router);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;