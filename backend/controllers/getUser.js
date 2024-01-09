import jwt from 'jsonwebtoken';
import { jwtSecret } from '../shared.js';

export { getUser };

async function getUser(req, res) {

    const token = getToken(req, res)
    if ('error' in token){
        return res.status(token.status).send(token.error)
    }
    else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) return res.status(401).json({error: 'invalid token'});
            return res.json(decoded)
        })
    }

}

function getToken(req, res) {
    const bearer = req.get('Authorization')
    if (!bearer ) return {error: 'token is missing', status: 400};
    const token = bearer.split('Bearer ')[1]
    if (!token) return {error: 'token is missing', status: 400};
    return token
}