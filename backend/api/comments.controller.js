import CommentsDAO from "../dao/commentsDAO.js"
import PostsDAO from "../dao/postsDAO.js";

export default class CommentsController {
    static async apiCommentPost(req, res, next) {
        console.log(req.body);
        try {
            const createCommentResponse = await CommentsDAO.addComment(req.body);

            let data = {
                post_id: req.body.post_id,
                comment_id: createCommentResponse
            }

            const addCommentResponse = await PostsDAO.addComment(data);
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiGetComments(req, res, next) {
        console.log(req.body);
    }
}