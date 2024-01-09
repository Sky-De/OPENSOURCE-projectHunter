import jwt from 'jsonwebtoken'
import { User } from "../models/user.js"
import { jwtSecret, expirationTime } from '../shared.js'

export { login }

async function login(req, res) {
    const data = req.body
    const user = await User.findOne({where: {username: data.username}})
    if (user){
        const token = jwt.sign({user},jwtSecret,{expiresIn: expirationTime})
        return res.json({token})
    }
    else{
        return res.status(400).send("Incorrect username or password")
    }
}