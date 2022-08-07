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

    static async apiPost(req, res, next) {
        console.log(req.body);
        try {
            const PostResponse = await PostsDAO.addPost(req.body);
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiReset(req, res, next) {
        try {
            const PostResponse = await PostsDAO.resetPost();
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}