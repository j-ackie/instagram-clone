import express, { Router } from "express";
import multer from "multer";
import PostsController from "./posts.controller.js";
import UsersController from "./users.controller.js";
import CommentsController from "./comments.controller.js";
import LikesController from "./likes.controller.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const auth = (req, res, next) => {
    if (req.session.userInfo) {
        next();
    }
    else {
        res.status(401).json({ error: "not logged in" });
    }
}

router.route("/").get(auth, PostsController.apiGetPosts);
router.route("/post/:postId").get(PostsController.apiGetPostById);
router.route("/likes/:postId").get(PostsController.apiGetLikesById);
router.route("/user/:userId").get(UsersController.apiGetUser);
router.route("/comment/:postId").get(CommentsController.apiGetComments);

router
    .route("/post")
    .get(PostsController.apiGetPostsByUserId)
    .post(auth, upload.single("file"), PostsController.apiCreatePost)
    .delete(auth, PostsController.apiDeletePost);

router
    .route("/likes")
    .get(PostsController.apiGetLikesById)
    .post(PostsController.apiLikePost);

router
    .route("/comment")
    .post(CommentsController.apiCommentPost);


router
    .route("/login")
    .get(UsersController.apiCheckLogin)
    .post(UsersController.apiLogin);

router
    .route("/logout")
    .post(UsersController.apiLogout);

router
    .route("/register")
    .post(UsersController.apiRegister);

router
    .route("/reset")
    .post(PostsController.apiResetPosts);


export default router;