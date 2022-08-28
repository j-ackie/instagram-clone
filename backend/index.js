import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import PostsDAO from "./dao/postsDAO.js";
import UsersDAO from "./dao/usersDAO.js";
import CommentsDAO from "./dao/commentsDAO.js";
import LikesDAO from "./dao/likesDAO.js";
import { S3Client } from "@aws-sdk/client-s3";

dotenv.config();

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_BUCKET_REGION
});

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
    await CommentsDAO.injectDB(client);
    await LikesDAO.injectDB(client);
    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });
});

export default s3;