import 'dotenv/config.js'
export {
    jwtSecret,
    validGenders,
    expirationTime,
    validPasswordCharacters,
    emailParams
}

const jwtSecret = process.env.JWTSECRET
const validGenders = ['M', 'F', 'GN', 'O']
const validPasswordCharacters = ['!', '@', '#']
const expirationTime = '1h' // '1h', '1m', '1s'

const emailParams = {host: process.env.EMAIL_HOST, port: process.env.EMAIL_PORT, address: EMAIL_ADDRESS, password: process.env.EMAIL_PASSWORD}