import express from "express";
import PostsController from "./posts.controller.js";

const router = express.Router();

router.route("/").get(PostsController.apiGetPosts);

router
    .route("/post")
    .post(PostsController.apiPost);

router
    .route("/reset")
    .post(PostsController.apiReset);

export default router;