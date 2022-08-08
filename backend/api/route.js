import express, { Router } from "express";
import PostsController from "./posts.controller.js";
import UsersController from "./users.controller.js";

const router = express.Router();

router.route("/").get(PostsController.apiGetPosts);
router.route("/post/:postId").get(PostsController.apiGetPostById);
router.route("/user/:userId").get(UsersController.apiGetUserById);

router
    .route("/post")
    .post(PostsController.apiCreatePost);


router
    .route("/login")
    .post(UsersController.apiLogin)

router
    .route("/reset")
    .post(PostsController.apiResetPosts);


export default router;