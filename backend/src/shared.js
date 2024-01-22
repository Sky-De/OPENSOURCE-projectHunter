import AWS from 'aws-sdk';
import multer from 'multer';

import 'dotenv/config.js';

export {
  jwtSecret,
  validGenders,
  expirationTime,
  validPasswordCharacters,
  emailParams,
  s3,
  upload,
  getToken,
};

const jwtSecret = process.env.JWTSECRET;
const validGenders = ['M', 'F', 'GN', 'O'];
const validPasswordCharacters = ['!', '@', '#'];
const expirationTime = '1h'; // '1h', '1m', '1s'

const emailParams = {host: process.env.EMAIL_HOST, port: process.env.EMAIL_PORT, address: EMAIL_ADDRESS, password: process.env.EMAIL_PASSWORD}

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1',
});

const s3 = new AWS.S3();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function getToken(req) {
  const bearer = req.get('Authorization');
  if (!bearer) return { error: 'token is missing', status: 400 };
  const token = bearer.split('Bearer ')[1];
  if (!token) return { error: 'token is missing', status: 400 };
  return { token: token };
}
