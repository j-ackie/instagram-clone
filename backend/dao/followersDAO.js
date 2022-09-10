import { ObjectId } from "mongodb";

let followers;

export default class FollowersDAO {
    static async injectDB(conn) {
        if (followers) {
            return;
        }
        try {
            followers = await conn.db(process.env.DB).collection("followers")
        }
        catch (err) {
            console.error('Unable to establish a connection handle in followersDAO: ');
        }
    }

    static async getFollowers(query) {
        try {
            if ("userId" in query) {
                query.userId = ObjectId(query.userId);
            }
            if ("followerId" in query) {
                query.followerId = ObjectId(query.followerId);
            }
            return await followers.find(query).toArray();
        }
        catch (err) {
            return { error: err };
        }
    }

    static async getFollowerByIds(userId, followerId) {
        const query = {
            userId: ObjectId(userId),
            followerId: ObjectId(followerId)
        };

        try {
            return await followers.findOne(query);
        }
        catch (err) {
            return { error: err };
        }
    }

    static async createFollower(userId, followerId) {
        const query = {
            userId: ObjectId(userId),
            followerId: ObjectId(followerId)
        }
        try {
            return await followers.insertOne(query);
        }
        catch (err) {
            return { error: err }
        }
    }

    static async deleteFollower(userId, followerId) {
        const query = {
            userId: ObjectId(userId),
            followerId: ObjectId(followerId)
        }
        try {
            return await followers.deleteOne(query);
        }
        catch (err) {
            return { error: err };
        }
    }

}