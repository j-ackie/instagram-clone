import express, { Router } from "express";
import multer from "multer";
import PostsController from "./posts.controller.js";
import UsersController from "./users.controller.js";
import CommentsController from "./comments.controller.js"

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/").get(PostsController.apiGetPosts);
router.route("/post/:postId").get(PostsController.apiGetPostById);
router.route("/user/:userId").get(UsersController.apiGetUserById);

router
    .route("/post")
    .post(upload.single("file"), PostsController.apiCreatePost);

router
    .route("/like")
    .post(PostsController.apiLikePost);

router
    .route("/comment")
    .post(CommentsController.apiCommentPost);


router
    .route("/login")
    .post(UsersController.apiLogin)

router
    .route("/reset")
    .post(PostsController.apiResetPosts);


export default router;