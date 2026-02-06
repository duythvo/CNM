import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.REAL_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REAL_AWS_SECRET,
  region: process.env.AWS_REGION,
});

export default s3;
