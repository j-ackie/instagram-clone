import { ObjectId } from "mongodb";

let saves;

export default class SavesDAO {
    static async injectDB(conn) {
        if (saves) {
            return;
        }
        try {
            saves = await conn.db(process.env.DB).collection("saves");
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getSaves(postId, userId) {
        const query = {
            userId: ObjectId(userId)
        };

        if (postId) {
            query.postId = ObjectId(postId);
        }

        try {
            return await saves.find(query).sort({ _id: -1 }).toArray();
        }
        catch (err) {
            return { error: err };
        }
    }

    static async getSavesByUserId(userId) {
        const query = {
            userId: ObjectId(userId)
        };

        try {
            return await saves.find(query).sort({ _id: -1 }).toArray();
        }
        catch (err) {
            return { error: err };
        }
    } 

    static async getSaveByIds(postId, userId) {
        const query = {
            postId: ObjectId(postId),
            userId: ObjectId(userId)
        };

        try {
            return await saves.findOne(query);
        }
        catch (err) {
            return { error: err };
        }
    }

    static async createSave(postId, userId) {
        const data = {
            postId: ObjectId(postId),
            userId: ObjectId(userId)
        };

        try {
            return await saves.insertOne(data);
        }
        catch (err) {
            return { error: err };
        }
    }
}