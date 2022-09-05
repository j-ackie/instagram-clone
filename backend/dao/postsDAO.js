import mongodb, { ObjectID } from "mongodb";
const ObjectId = mongodb.ObjectID;

let posts;

export default class PostsDAO {
    static async injectDB(conn) {
        if (posts) {
            return;
        }
        try {
            posts = await conn.db(process.env.DB).collection("posts")
        }
        catch (err) {
            console.error('Unable to establish a connection handle in postsDAO: ');
        }
    }

    static async getPosts({
        filters = null,
        page = 0,
        postsPerPage = 20
    } = {}) {
        let query;
        
        let cursor;
        try {
            cursor = await posts.find(query);
        }
        catch (err) {
            console.error('Unable to issue find command: ')
            return;
        }

        const displayCursor = cursor.limit(postsPerPage).skip(postsPerPage * page).sort({'_id': -1});

        const postsList = await displayCursor.toArray();
        const totalPosts = await posts.countDocuments(query);

        return { postsList, totalPosts };
    }

    static async getPostById(postId) {
        let query = { "_id": ObjectId(postId) };
        let doc;

        try {
            doc = await posts.findOne(query);
        }
        catch (err) {
            console.error(err);
            return;
        }

        return doc;
    }

    static async getPostsByUserId(userId) {
        let query = { "userId": ObjectId(userId) };
        
        try {
            const postsList = await posts.find(query).toArray();
            return postsList;
        }
        catch (err) {
            return;
        }
    }

    static async addPost(data) {
        data.userId = ObjectId(data.userId);
        try {
            return await posts.insertOne(data);
        }
        catch (err) {
            console.error('Unable to post: ');
            return { error: err };
        }
    }

    static async deletePost(postId) {
        let query = {
            _id: ObjectId(postId),
        };
        try {
            const response = await posts.deleteOne(query);
            return response;
        }
        catch (err) {
            return { error: err };
        }
    }

    static async likePost(data) {
        let query = { "_id": { $eq: new ObjectId(data.post_id) } };
        let updateOperation = { $addToSet: { "likes": new ObjectId(data.user_id) } };
        try {
            const response = await posts.updateOne(query, updateOperation);
            return response;
        }
        catch {
            console.error(err);
            return { error: err };
        }
    }

    static async addComment(data) {
        let query = { "_id": { $eq: new ObjectId(data.post_id) } };
        let updateOperation = { $addToSet: { "comments": new ObjectId(data.comment_id) } };
        try {
            const response = await posts.updateOne(query, updateOperation);
            return response;
        }
        catch {
            console.error(err);
            return { error: err };
        }
    }

    static async resetPost() {
        try {
            return await posts.deleteMany({});
        }
        catch (err) {
            return { error: err };
        }
    }
}

