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

    static async login(data) {
        let query = { "username": { $eq: data.username } };
        let doc;
        
        try {
            doc = await users.findOne(query);
            
        }
        catch (err) {
            console.err(err);
            return;
        }
        
        return doc;
    }

    static async register(data) {
        console.log(data);
        try {
            const getResponse = await this.getUserByName(data.username);

            if (!getResponse) {
                data.profile_picture = "";
                const insertResponse = await users.insertOne(data);
                return insertResponse.insertedId;
            }
        }
        catch (err) {
            console.err(err);
            return;
        }
    }
}