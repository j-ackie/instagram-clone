import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import PostsDAO from "./dao/postsDAO.js";
import UsersDAO from "./dao/usersDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 3000;
MongoClient.connect(
    process.env.URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    }
)
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    await PostsDAO.injectDB(client);
    await UsersDAO.injectDB(client);
    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });
});