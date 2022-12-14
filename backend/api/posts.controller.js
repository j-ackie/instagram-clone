import PostsDAO from "../dao/postsDAO.js";
import FollowersDAO from "../dao/followersDAO.js";
import LikesDAO from "../dao/likesDAO.js";
import SavesDAO from "../dao/savesDAO.js";
import upload, { get, del } from "../s3.js";
import CommentsDAO from "../dao/commentsDAO.js";

export default class PostsController {
    static async apiGetPosts(req, res, next) {
        try {
            const getFollowingResponse = await FollowersDAO.getFollowers({
                followerId: req.userId
            });

            const followingList = getFollowingResponse.map(element => {
                return element.userId;
            });

            const getPostsResponse = await PostsDAO.getPosts(req.userId, followingList, 10, parseInt(req.query.page));
            for (const post of getPostsResponse.posts) {
                let files = [];
                for (const filename of post.filenames) {
                    files.push(await get(filename));
                }

                post.files = files;
                delete post.filenames;
            }

            res.json({
                posts: getPostsResponse.posts,
                numPosts: getPostsResponse.numPosts
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetPostById(req, res, next) {
        try {
            let postId = req.params.postId;
            let post = await PostsDAO.getPostById(postId);
            if (!post) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            let files = [];
            for (const filename of post.filenames) {
                files.push(await get(filename));
            }
            post.files = files;
            delete post.filenames;

            res.json(post);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetPostsByUserId(req, res, next) {
        try {
            const getResponse = await PostsDAO.getPostsByUserId(req.query.userId);

            for (const post of getResponse) {
                let files = [];
                for (const filename of post.filenames) {
                    files.push(await get(filename));
                }
                post.files = files;
                delete post.filenames;
            }

            res.json({
                posts: getResponse
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiCreatePost(req, res, next) {
        if (req.files.length === 0) {
            res.status(401).json({ error: "no files" });
            return;
        }

        let filenames = [];
        for (const file of req.files) {
            filenames.push(await upload(file));
        }

        req.body.userId = req.userId;
        req.body.filenames = filenames;
        req.body.date = new Date(req.body.date);

        try {
            const createResponse = await PostsDAO.addPost(req.body);
            res.json({ postId: createResponse.insertedId });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiDeletePost(req, res, next) {
        try {
            const getResponse = await PostsDAO.getPostById(req.params.postId);
            if (!getResponse) {
                res.status(401).json({ error: "post does not exist" });
                return;
            }
            if (req.userId !== getResponse.userId.toString()) {
                res.status(401).json({ error: "not user's post" });
                return;
            }

            const deletePostResponse = await PostsDAO.deletePost(req.params.postId);

            if (deletePostResponse.error) {
                res.status(500).json({ error: deletePostResponse.error.message });
            }

            for (const filename of getResponse.filenames) {
                await del(filename);
            }

            const deleteCommentsResponse = await CommentsDAO.deleteCommentsByPostId(req.params.postId);
            const deleteLikesResponse = await LikesDAO.deleteLikesByPostId(req.params.postId);
            const deleteSavesResponse = await SavesDAO.deleteSavesByPostId(req.params.postId);

            if (deleteCommentsResponse.error || deleteLikesResponse.error || deleteSavesResponse.error) {
                res.status(500).json({ error: "error while deleting associated resources" });
            }

            res.status(204).json();
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiLikePost(req, res, next) {
        try {
            const getResponse = await LikesDAO.getLikeByIds(req.body.postId, req.userId);
            
            if (getResponse) {
                res.status(400).json({ error: "already liked" });
                return;
            }

            const createResponse = await LikesDAO.createLike(req.body.postId, req.userId);
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiUnlikePost(req, res, next) {
        try {
            const getResponse = await LikesDAO.getLikeByIds(req.query.postId, req.userId);

            if (!getResponse) {
                res.status(400).json({ error: "already unliked" });
                return;
            }

            const deleteResponse = LikesDAO.deleteLike(req.query.postId, req.userId);
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetLikesById(req, res, next) {
        try {
            const getResponse = await LikesDAO.getLikesById(req.query.postId);
            res.json({
                likes: getResponse
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetSaveByPostId(req, res, next) {
        try {
            const getResponse = await SavesDAO.getSaveByIds(req.query.postId, req.userId);
            res.json({
                save: getResponse
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetSaves(req, res, next) {
        try {
            const getResponse = await SavesDAO.getSaves(req.query.postId, req.userId);
            res.json({ saves: getResponse });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiSavePost(req, res, next) {
        try {
            const getResponse = await SavesDAO.getSaveByIds(req.body.postId, req.userId);

            if (getResponse) {
                res.status(400).json({ error: "already saved" });
                return;
            }

            const createResponse = await SavesDAO.createSave(req.body.postId, req.userId);
            res.status(204).json();
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

    static async apiGetComments(req, res, next) {
        try {
            const getCommentsResponse = await CommentsDAO.getCommentsByPostId(req.query.postId);

            res.json({ comments: getCommentsResponse });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiCommentPost(req, res, next) {
        try {
            req.body.date = new Date(req.body.date);
            const createResponse = await CommentsDAO.addComment(req.body, req.userId);
            res.json({ insertedId: createResponse.insertedId });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }
}