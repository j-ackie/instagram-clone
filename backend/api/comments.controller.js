import CommentsDAO from "../dao/commentsDAO.js"

export default class CommentsController {
    static async apiGetComments(req, res, next) {
        try {
            const getCommentsResponse = await CommentsDAO.getComments(req.query.postId);

            res.json({ comments: getCommentsResponse });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiCommentPost(req, res, next) {
        try {
            const createResponse = await CommentsDAO.addComment(req.body, req.userId);
            res.json({ status: "success", insertedId: createResponse.insertedId });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }
}