import express from "express";
import PostsController from "./posts.controller.js";

const router = express.Router();

router.route("/").get((req, res) => res.send("hello world"));

router
    .route("/post")
    .post(PostsController.apiPost);

export default router;