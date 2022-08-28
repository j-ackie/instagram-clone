import PostsDAO from "../dao/postsDAO.js";
import LikesDAO from "../dao/likesDAO.js";
import upload, { get } from "../s3.js";

export default class PostsController {
    static async apiGetPosts(req, res, next) {
        const postsPerPage = req.query.postsPerPage ? parseInt(req.query.postsPerPage, 10) : 20;
        
        const { postsList, totalPosts } = await PostsDAO.getPosts();

        for (const post of postsList) {
            post.file = await get(post.filename);
            delete post.filename;
        }

        let response = {
            posts: postsList
        };

        res.json(response);
    }

    static async apiGetPostById(req, res, next) {
        try {
            let postId = req.params.postId;
            let post = await PostsDAO.getPostById(postId);
            if (!post) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            let data = {
                postId: post._id,
                userId: post.user_id,
                caption: post.caption,
                file: await get(post.filename),
                date: post.date,
                likes: post.likes
            }

            res.json(data);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }

    static async apiCreatePost(req, res, next) {
        const filename = await upload(req.file);
        req.body.filename = filename;
        req.body.date = new Date();
        req.body.likes = [];
        try {
            const PostResponse = await PostsDAO.addPost(req.body);
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiDeletePost(req, res, next) {
        console.log(req.body);
        console.log(req.query);
        try {
            const deleteResponse = await PostsDAO.deletePost(req.query.postId, req.body.userId);
            res.json({ status: "success" })
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiLikePost(req, res, next) {
        try {
            const createResponse = await LikesDAO.createLike(req.body.postId, req.body.userId);
            const { error } = createResponse;
            if (error) {
                res.status(409).json({ error: "unable to like" });
                return;
            }
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
        // try {
        //     const likeResponse = await PostsDAO.likePost(req.body);
        //     if (likeResponse.modifiedCount === 1) {
        //         res.json({ status: "success" });
        //     }
        //     else {
        //         res.json({ status: "no changes" });
        //     }
        // }
        // catch (err) {
        //     res.status(500).json({ error: err.message });
        // }
    }

    static async apiGetLikesById(req, res, next) {
        try {
            const getResponse = await LikesDAO.getLikesById(req.query.postId);
            res.json({
                status: "success",
                likes: getResponse
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiResetPosts(req, res, next) {
        try {
            const PostResponse = await PostsDAO.resetPost();
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}