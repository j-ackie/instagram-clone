import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID;

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

    static async getUserById(userId) {
        let query = { "_id": { $eq: new ObjectId(userId) } };
        let doc;

        try {
            doc = await users.findOne(query);
        }
        catch (err) {
            console.error(err);
            return;
        }
        console.log(doc);
        return doc;
    }

    static async login(data) {
        let query = { "username": { $eq: data.username } };
        let cursor;
        
        try {
            cursor = await users.find(query).limit(1);
        }
        catch (err) {
            console.err(err);
            return false;
        }
        
        let userInfo = await cursor.toArray();
        if (userInfo.length === 0) {
            return false;
        }

        userInfo = userInfo[0];
        return userInfo.password === data.password;
    }
}