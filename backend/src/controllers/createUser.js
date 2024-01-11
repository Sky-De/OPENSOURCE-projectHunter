import { User } from '../models/user.js'
import { validGenders, validPasswordCharacters } from '../shared.js'
import bcrypt from 'bcrypt'
import pkg from 'password-validator'
const passwordValidator  = pkg


let schema = new passwordValidator()

export { createUser }

async function createUser(req, res) {
    const data = req.body

    const notValid = await validate(data) // Input Validation
    if (notValid) {
        return res.status(notValid.status).send(notValid.error)
    }
    else {
        bcrypt.hash(data.password, 2, async function(err, hash) {
            const user = await User.create({
                username: data.username,
                password: hash, // DO NOT SEND THIS!!!!
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
                state: data.state,
                occupation: data.occupation,
                distance: data.distance,
                age: data.age,
            })
    
            const sanitizedUser = { ...user.toJSON(), password: undefined}

            return res.json(sanitizedUser)
        });
    }
}

async function validate(data) {

    if (!("firstName" in data)) return { error: "First name not provided", status: 400}

    if (!("password" in data)) return { error: "Password not provided", status: 400}

    if (!("age" in data)) return { error: "Age not provided", status: 400}
     
    if (!("minAge" in data)) return { error: "Min age not provided", status: 400}

    if (!("maxAge" in data)) return { error: "Max age not provided", status: 400}

    if (!("pronoun" in data)) return { error: "Pronoun not provided", status: 400}

    if (!("preferences" in data)) return { error: "Prefrences not provided", status: 400}

    if (!("state" in data)) return { error: "State not provided", status: 400}

    if (!("city" in data)) return { error: "City not provided", status: 400}

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

}