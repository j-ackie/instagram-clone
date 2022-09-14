import { ObjectId } from "mongodb";

let posts;

export default class PostsDAO {
    static async injectDB(conn) {
        if (posts) {
            return;
        }
        try {
            posts = await conn.db(process.env.DB).collection("posts");
        }
        catch (err) {
            console.error('Unable to establish a connection handle in postsDAO: ');
        }
    }

    static async getPosts(userId, followers, postsPerPage=20, page=0) {
        const query = {
            $or: [
                {
                    userId: { $eq: ObjectId(userId) }
                },
                {
                    userId: { $in: followers }
                }
            ]
        };

        try {
            const cursor = await posts.find(query).sort({ date: -1 });

            const displayCursor = await cursor.limit(postsPerPage).skip(postsPerPage * page);

            const postsList = await displayCursor.toArray();

            const numPosts = await posts.countDocuments(query);
    
            return {
                posts: postsList,
                numPosts: numPosts
            };
        }
        catch (err) {
            return { error: err };
        }
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
            const postsList = await posts.find(query).sort({ date: -1 }).toArray();
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

    static async resetPost() {
        try {
            return await posts.deleteMany({});
        }
        catch (err) {
            return { error: err };
        }
    }
}

