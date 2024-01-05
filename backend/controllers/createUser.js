import { User } from '../models/user.js'

export { createUser }

async function createUser(req, res) {
    const data = req.body
    const user = await User.create({
        username: data.username,
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        gender: data.gender,
        minAge: data.minAge,
        maxAge: data.maxAge,
        preferences: data.preferences,
        dob: new Date(data.dob),
        bio: data.bio,
        city: data.city,
        occupation: data.occupation,
        distance: data.distance,
        age: data.age,
    })
    res.json(user)
}