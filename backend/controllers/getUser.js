import jwt from 'jsonwebtoken'
import { jwtSecret } from '../shared.js'

export { getUser }

async function getUser(req, res) {
    const of = req.get('Authorization')
    if (!of ) return res.status(400).json({error: 'token is missing'})
    const token = of.split('Bearer ')[1]

    if (!token) return res.status(400).json({error: 'token is missing'})

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err){
            return res.status(401).json({error: 'invalid token'})
        }
        res.json(decoded)
    })
}