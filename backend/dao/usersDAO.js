import { ObjectId } from "mongodb";

let users;

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return;
        }
        try {
            users = await conn.db(process.env.DB).collection("users");
        }
        catch (err) {
            console.error(err);
        }
    }

    static async searchUsers(query) {
        try {
            const searchResults = await users.aggregate([
                {
                    $search: {
                        autocomplete: {
                            query: query,
                            path: "username"
                        }
                    }
                },
                {
                    $sort: { "score": { $meta: "textScore" } }
                },
                {
                    $limit: 10
                },
            ]);

            return searchResults.toArray();
        }
        catch (err) {
            return { error: err };
        }
    }

    static async getUserById(userId) {
        let query = { "_id": ObjectId(userId) };
        let doc;

        try {
            doc = await users.findOne(query);
        }
        catch (err) {
            console.error(err);
            return;
        }
        return doc;
    }

    static async getUserByName(username) {
        let query = { "username": { $eq: username } };
        let doc;
        
        try {
            doc = await users.findOne(query);
        }
        catch (err) {
            console.error(err);
            return;
        }
        
        return doc;
    }

    static async createUser(userInfo) {
        try {
            return await users.insertOne(userInfo);
        }
        catch (err) {
            console.err(err);
            return;
        }
    }

    static async updateUser(userId, data) {
        try {
            return await users.updateOne(
                { _id: ObjectId(userId) },
                { $set: data }
            );
        }
        catch (err) {
            return { error: err };
        }
    }
}