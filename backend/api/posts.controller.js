import PostsDAO from "../dao/postsDAO.js"

export default class PostsController {
    static async apiGetPosts(req, res, next) {
        const postsPerPage = req.query.postsPerPage ? parseInt(req.query.postsPerPage, 10) : 20;
        
        const { postsList, totalPosts } = await PostsDAO.getPosts();

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
            res.json(post);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }

    static async apiCreatePost(req, res, next) {
        console.log(req.body);
        try {
            const PostResponse = await PostsDAO.addPost(req.body);
            res.json({ status: "success" });
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