import 'dotenv/config.js';
export { jwtSecret, validGenders, expirationTime, validPasswordCharacters };

const jwtSecret = process.env.JWTSECRET;
const validGenders = ['M', 'F', 'GN', 'O'];
const validPasswordCharacters = ['!', '@', '#'];
const expirationTime = '1h'; // '1h', '1m', '1s'
