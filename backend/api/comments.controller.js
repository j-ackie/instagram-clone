import CommentsDAO from "../dao/commentsDAO.js"

export default class CommentsController {
    static async apiGetComments(req, res, next) {
        try {
            const getCommentsResponse = await CommentsDAO.getComments(req.params.postId);

            let response = {
                comments: getCommentsResponse
            };

            res.json(response);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }


    static async apiCommentPost(req, res, next) {
        try {
            const createResponse = await CommentsDAO.addComment(req.body);
            res.json({ status: "success", insertedId: createResponse.insertedId });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }
}