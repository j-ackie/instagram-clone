import express, { Router } from "express";
import multer from "multer";
import PostsController from "./posts.controller.js";
import UsersController from "./users.controller.js";
import CommentsController from "./comments.controller.js";
import AuthController from "./auth.controller.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("invalid file type"));
        }
    }
});

const auth = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        res.status(401).json({ error: "not logged in" });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.clearCookie("token");
            res.status(401).json({ error: err.message });
            return;
        }
        req.userId = decoded.userId;
        next();
    });
}

const createToken = (req, res) => {
    if (!req.payload) {
        res.status(500).json({ error: "could not create jwt" });
        return;
    }

    const token = jwt.sign(req.payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h"
    });

    res.cookie("token", token, {
        httpOnly: true
    });

    res.status(204).json();
}

router.route("/")
    .get(auth, PostsController.apiGetPosts);

router
    .route("/users")
    .get(UsersController.apiSearchUsers)

router
    .route("/users/:userId")
    .get(UsersController.apiGetUser)
    .put(auth, upload.single("profilePicture"), UsersController.apiUpdateUser);

router
    .route("/posts/:postId")
    .get(PostsController.apiGetPostById)
    .delete(auth, PostsController.apiDeletePost);

router
    .route("/posts")
    .get(PostsController.apiGetPostsByUserId)
    .post(auth, upload.array("file"), PostsController.apiCreatePost)

router
    .route("/likes")
    .get(PostsController.apiGetLikesById)
    .post(auth, PostsController.apiLikePost)
    .delete(auth, PostsController.apiUnlikePost);

router
    .route("/saves")
    .get(auth, PostsController.apiGetSaves)
    .post(auth, PostsController.apiSavePost);
    
router
    .route("/comments")
    .get(CommentsController.apiGetComments)
    .post(auth, CommentsController.apiCommentPost);

router
    .route("/followers")
    .get(UsersController.apiGetFollowers)
    .post(auth, UsersController.apiFollowUser)
    .delete(auth, UsersController.apiUnfollowUser);

router
    .route("/auth/register")
    .post(AuthController.apiRegister, createToken);

router
    .route("/auth/login")
    .post(AuthController.apiLogin, createToken);

router
    .route("/auth/me")
    .get(AuthController.apiGetLogin);

router
    .route("/auth/logout")
    .post(auth, AuthController.apiLogout);

router
    .route("/reset")
    .post(PostsController.apiResetPosts);


export default router;