import mongodb from "mongodb";

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

        const displayCursor = cursor.limit(postsPerPage).skip(postsPerPage * page);

        const postsList = await displayCursor.toArray();
        const totalPosts = await posts.countDocuments(query);
        
        return { postsList, totalPosts };
    }

    static async addPost(data) {
        try {
            return await posts.insertOne(data);
        }
        catch (err) {
            console.log(err)
            console.error('Unable to post: ');
            return { error: err };
        }
    }

    static async resetPost() {
        try {
            return await posts.deleteMany({});
        }
        catch (err) {
            console.log("A");
            return { error: err };
        }
    }
}

