import CommentsDAO from "../dao/commentsDAO.js"

export default class CommentsController {
    static async apiGetComments(req, res, next) {
        console.log(req.params);
        try {
            const getCommentsResponse = await CommentsDAO.getComments(req.params.postId);
            console.log(getCommentsResponse);

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
        console.log(req.body);
        try {
            await CommentsDAO.addComment(req.body);
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }
}