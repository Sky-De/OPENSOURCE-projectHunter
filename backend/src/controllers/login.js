import jwt from 'jsonwebtoken'
import { User } from "../models/user.js"
import { jwtSecret, expirationTime } from '../shared.js'
import bcrypt from 'bcrypt'

export { login }

async function login(req, res) {
    const data = req.body

    
    const user = await User.findOne({where: {username: data.username}})
    if (user) {
        bcrypt.compare(data.password, user.password, async function(err, result){
            console.log(data.password, user.password)
            if (err || !result) return res.status(400).send("Incorrect username or password")
            const token = jwt.sign({user},jwtSecret,{expiresIn: expirationTime})
            return res.status(200).json({token})
        })
    }
    else return res.status(400).send("Incorrect username or password")
}