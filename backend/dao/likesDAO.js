import { ObjectId } from "mongodb";

let likes;

export default class LikesDAO {
    static async injectDB(conn) {
        if (likes) {
            return;
        }
        try {
            likes = await conn.db(process.env.DB).collection("likes");
        }
        catch (err) {
            console.error('Unable to establish a connection handle in likesDAO: ');
        }
    }

    static async getNumLikesById(postId) {
        const query = {
            "postId": ObjectId(postId)
        }

        try {
            const numLikes = await likes.countDocuments(query);
            return numLikes;
        }
        catch (err) {
            console.error(err);
            return { error: err };
        }
    }

    static async getLikesById(postId) {
        const query = {
            "postId": ObjectId(postId)
        };

        const omittedFields = {
            postId: 0
        };

        try {
            const postLikes = await likes.find(query, { projection: omittedFields }).toArray();
            return postLikes;
        }
        catch (err) {
            console.error(err);
            return { error: err };
        }
    }

    static async getLikeByIds(postId, userId) {
        const query = { 
            "postId": ObjectId(postId),
            "userId": ObjectId(userId)
        };

        try {
            return await likes.findOne(query);
        }

        catch (err) {
            return { error: err };
        }
    }

    static async createLike(postId, userId) {
        const query = { 
            "postId": ObjectId(postId),
            "userId": ObjectId(userId)
        };
        
        try {
            return await likes.insertOne(query);
        }
        catch (err) {
            console.error(err);
            return { error: err };
        }
    }

    static async deleteLike(postId, userId) {
        const query = {
            postId: ObjectId(postId),
            userId: ObjectId(userId)
        };

        try {
            return await likes.deleteOne(query);
        }
        catch (err) {
            return { error: err };
        }
    }

    static async deleteLikesByPostId(postId) {
        const query = {
            postId: ObjectId(postId)
        };
        try {
            return await likes.deleteMany(query);
        }
        catch (err) {
            return { error: err };
        }
    }
}

