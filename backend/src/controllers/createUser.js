import { User } from '../models/user.js'
import { validGenders, validPasswordCharacters } from '../shared.js'
import bcrypt from 'bcrypt'
import pkg from 'password-validator'
import { Invite } from '../models/invite.js'
const passwordValidator  = pkg


let schema = new passwordValidator()

export { createUser }

async function createUser(req, res) {
    const data = req.body
    let date = new Date(data.dob) 
    let currDate = new Date() 
    let milli = currDate.getTime() - date.getTime()
    let year = yearsconversion(milli)
    let invite = await Invite.findOne({
        where: {invite_key: data.ikey},
        })
    if(!invite) return res.status(400).send("no invite")
    const notValid = await validate(data, year) // Input Validation
    if ('error' in notValid) {
        return res.status(notValid.status).send(notValid.error)
    }
    else {
        bcrypt.hash(data.password, 2, async function(err, hash) {
            const user = await User.create({
                username: invite.username,
                password: hash, // DO NOT SEND THIS!!!!
                email: invite.email,
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
                age:year,
            })
            await invite.destroy()
    
            const sanitizedUser = { ...user.toJSON(), password: undefined}

            return res.json(sanitizedUser)
        });
    }
}

// async function validate(data) {

//     if (!("firstName" in data)) return { error: "First name not provided", status: 400}

//     if (!("password" in data)) return { error: "Password not provided", status: 400}

//     if (!("age" in data)) return { error: "Age not provided", status: 400}
     
//     if (!("minAge" in data)) return { error: "Min age not provided", status: 400}

//     if (!("maxAge" in data)) return { error: "Max age not provided", status: 400}

//     if (!("pronoun" in data)) return { error: "Pronoun not provided", status: 400}

//     if (!("preferences" in data)) return { error: "Prefrences not provided", status: 400}

//     if (!("state" in data)) return { error: "State not provided", status: 400}

//     if (!("city" in data)) return { error: "City not provided", status: 400}

async function validate(data, year) {
  if (year < 18){
    return { error: "Jailbait", status: 400}
  }

    const requiredFields = ["firstName", "password", "minAge", "maxAge", "pronoun", "preferences", "state", "city"];

    for (const field of requiredFields) {
        if (!(field in data)) {
            return { error: `${field} not provided`, status: 400 };
        }
    }

    if (!(validGenders.includes(data.gender))) return { error: "Incorrect gender value", status: 400 } // Make sure the inputted gender is an option

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
    return { success: "Validation passed", status: 200 };
}


function yearsconversion(milli) {
    const milliToYears = 1000 * 60 * 60 * 24 * 365.25;
    const years = Math.trunc(milli / milliToYears);
    return years;
}