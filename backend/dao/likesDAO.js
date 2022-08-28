import { response } from "express";
import mongodb, { ObjectId } from "mongodb";

let likes;

export default class LikesDAO {
    static async injectDB(conn) {
        if (likes) {
            return;
        }
        try {
            likes = await conn.db(process.env.DB).collection("likes")
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

    static async createLike(postId, userId) {
        console.log(postId, userId);
        const query = { 
            "postId": ObjectId(postId),
            "userId": ObjectId(userId)
        };
        
        try {
            if (await likes.countDocuments(query) === 0) {
                return await likes.insertOne(query);
            }
            else {
                return { error: "wad" }
            }
        }
        catch (err) {
            console.error(err);
            return { error: err };
        }
    }

}

