import { User } from '../models/user.js'
import { validGenders, validPasswordCharacters } from '../shared.js'
import pkg from 'password-validator'
const passwordValidator  = pkg
// var passwordValidator = require('password-validator');


let schema = new passwordValidator()

export { createUser }

async function createUser(req, res) {
    const data = req.body

    const notValid = await validate(data) // Input Validation
    if (notValid) {
        return res.status(notValid.status).send(notValid.error)
    }
    else {
        const user = await User.create({
            username: data.username,
            password: data.password,
            email: data.email,
            firstName: data.firstName,
            gender: data.gender,
            minAge: data.minAge,
            maxAge: data.maxAge,
            preferences: data.preferences,
            pronoun: data.pronoun,
            dob: new Date(data.dob),
            bio: data.bio,
            city: data.city,
            occupation: data.occupation,
            distance: data.distance,
            age: data.age,
        })

        return res.json(user)
    }
}

async function validate(data) {

    if (!(validGenders.includes(data.gender))) return { error: "Incorrect gender value", status: 400 } // Make sure the inputted gender is an option
    
    if (await User.findOne({where: {username: data.username}})) return { error: "Username is already taken", status: 400 } // Username must be unique

    if (await User.findOne({where: {email: data.email}})) return { error: "Email is already taken", status: 400 } // Email must be unique

    schema
        .is().min(8)
        .is().max(50)
        .has().uppercase()
        .has().lowercase()
        .has().digits(2)
        .has().not().spaces()
        .has().symbols(1)

    if (!schema.validate(data.password)) { // This means the password is not valid for AT LEAST ONE reason
        return { error: `Password has failed due to incorrect: ${schema.validate(data.password, { list: true})}`, status: 400}
    }

    // Make sure all required inputs exist and are notValid
}