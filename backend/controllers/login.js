import jwt from 'jsonwebtoken'
import { User } from "../models/user.js"
import { jwtSecret } from '../shared.js'

export { login }

async function login(req, res) {
    const data = req.body
    const user = await User.findOne({where: {username: data.username}})
    if (user){
        const token = jwt.sign({user},jwtSecret,{expiresIn:'1h'})
        res.json({token})
    }
    else{
        res.status(400).send("User Not Found")
    }
}