import { ObjectId } from "mongodb";

let auth;

export default class AuthDAO {
    static async injectDB(conn) {
        if (auth) {
            return;
        }
        try {
            auth = await conn.db(process.env.DB).collection("auth");
        }
        catch (err) {
            console.error("Could not connect to auth");
        }
    }

    static async createUser(password) {
        const data = {
            password: password
        };

        try {
            return await auth.insertOne(data);
        }
        catch (err) {
            return { error: err };
        }
    }

    static async updatePassword(userId, password) {
        const query = {
            _id: ObjectId(userId)
        };
        
        try {
            return await auth.updateOne(query, {
                $set: { password }
            });
        }
        catch (err) {
            return { error: err };
        }
    }

    static async getUserById(userId) {
        const query = { _id: ObjectId(userId) };
        try {
            return await auth.findOne(query);
        }
        catch (err) {
            return { error: err };
        }
    }
}