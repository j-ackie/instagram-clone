import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";


export default async function upload(file) {
    const s3 = new S3Client({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        },
        region: process.env.AWS_BUCKET_REGION
    });

    const filename = crypto.randomBytes(32).toString("hex");

    const putParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype
    }

    const putCommand = new PutObjectCommand(putParams);
    await s3.send(putCommand);

    return filename;

    
}

export async function get(filename) {
    const s3 = new S3Client({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        },
        region: process.env.AWS_BUCKET_REGION
    });

    const getParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename
    }

    const getCommand = new GetObjectCommand(getParams);
    const url = await getSignedUrl(s3, getCommand, { expiresIn: 600 });

    return url;
}