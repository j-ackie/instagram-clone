import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

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

    static async createFollower() {

    }

}