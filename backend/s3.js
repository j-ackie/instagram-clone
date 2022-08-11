import s3 from "./index.js"
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";


export default async function upload(file) {
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
    const getParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename
    }

    const getCommand = new GetObjectCommand(getParams);
    const url = await getSignedUrl(s3, getCommand, { expiresIn: 600 });

    return url;
}