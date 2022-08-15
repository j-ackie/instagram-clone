import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let comments;

export default class CommentsDAO {
    static async injectDB(conn) {
        if (comments) {
            return;
        }
        try {
            comments = await conn.db(process.env.DB).collection("comments")
        }
        catch (err) {
            console.error('Unable to establish a connection handle in postsDAO: ');
        }
    }

    static async getComments(data) {
        let query = { "post_id": new ObjectId(data) }
        let cursor;
        try {
            cursor = await comments.find(query).sort({'_id': -1});
            const commentsList = await cursor.toArray();
            return commentsList;
        }
        catch (err) {
            console.error(err);
            return;
        }

    }

    static async addComment(data) {
        data.post_id = new ObjectId(data.post_id);
        data.user_id = new ObjectId(data.user_id);
        try {
            let response = await comments.insertOne(data);
            return response.insertedId;
        }
        catch (err) {
            console.error(err);
            return { error: err };
        }
    }


}

