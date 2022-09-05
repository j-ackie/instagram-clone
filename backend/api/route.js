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
    if (!req.session.userInfo) {
        res.status(401).json({ error: "not logged in" });
        return;
    }
    next();
}

router.route("/").get(auth, PostsController.apiGetPosts);
router.route("/likes/:postId").get(PostsController.apiGetLikesById);
router.route("/users/:userId").get(UsersController.apiGetUser);
router.route("/comments/:postId").get(CommentsController.apiGetComments);

router
    .route("/users")
    .get(UsersController.apiSearchUsers)

router
    .route("/posts/:postId")
    .get(PostsController.apiGetPostById)
    .delete(auth, PostsController.apiDeletePost);

router
    .route("/posts")
    .get(PostsController.apiGetPostsByUserId)
    .post(auth, upload.single("file"), PostsController.apiCreatePost)

router
    .route("/likes")
    .get(PostsController.apiGetLikesById)
    .post(auth, PostsController.apiLikePost);

router
    .route("/comments")
    .post(auth, CommentsController.apiCommentPost);

router
    .route("/followers")
    .get(UsersController.apiGetFollowers)
    .post(auth, UsersController.apiFollowUser);


router
    .route("/login")
    .get(UsersController.apiCheckLogin)
    .post(UsersController.apiLogin);

router
    .route("/logout")
    .post(auth, UsersController.apiLogout);

router
    .route("/register")
    .post(UsersController.apiRegister);

router
    .route("/reset")
    .post(PostsController.apiResetPosts);


export default router;