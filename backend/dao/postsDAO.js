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
    }

    static async addPost(data) {
        console.log("HEYY")
        console.log(data)
        try {
            const postDoc = {
                text: "hey"
            };
            return await posts.insertOne(postDoc);
        }
        catch (err) {
            console.error('Unable to post: ');
            return { error: err };
        }
    }
}

