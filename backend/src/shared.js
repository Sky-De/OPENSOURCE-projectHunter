import AWS from 'aws-sdk';
import multer from 'multer';

import 'dotenv/config.js';

export {
  jwtSecret,
  validGenders,
  expirationTime,
  validPasswordCharacters,
  s3,
  upload,
};

const jwtSecret = process.env.JWTSECRET;
const validGenders = ['M', 'F', 'GN', 'O'];
const validPasswordCharacters = ['!', '@', '#'];
const expirationTime = '1h'; // '1h', '1m', '1s'

AWS.config.update({
  accessKeyId: 'AKIA5FTZDLDPY5362ASX',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const s3 = new AWS.S3();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
