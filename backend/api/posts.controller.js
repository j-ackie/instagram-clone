import PostsDAO from "../dao/postsDAO.js"

export default class PostsController {
    static async apiPost(req, res, next) {
        try {
            const PostResponse = await PostsDAO.addPost();
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}