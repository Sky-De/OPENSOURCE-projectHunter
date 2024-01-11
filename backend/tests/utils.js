import { User } from "../src/models/user"
import { seq } from "../src/models/connection";
import { makeServer } from "../src/app";
import bcrypt from 'bcrypt'

export {
    setupDatabase,
    teardownDatabase
}

async function setupDatabase() {
   
    const users = await User.bulkCreate([
        {
            "username": "testuser1",
            "password": bcrypt.hashSync('Password12!', 2),
            "email": "testuser1@gmail.com",
            "firstName": "bob",
            "dob": "2023-01-01T12:00:00Z",
            "gender": "M",
            "preferences": ["F" , "T"],
            "city": "Houston",
            "state": "TX",
            "pronoun": "Him",
            "age": 18,
            "minAge": 18,
            "maxAge": 20
        },
        {
            "username": "testuser2",
            "password": bcrypt.hashSync('Password12!', 2),
            "email": "testuser2@gmail.com",
            "firstName": "John",
            "dob": "2023-01-01T12:00:00Z",
            "gender": "M",
            "preferences": ["F" , "T"],
            "city": "Houston",
            "state": "TX",
            "pronoun": "Him",
            "age": 18,
            "minAge": 18,
            "maxAge": 20
        },
    ])

}

async function teardownDatabase() {
    await User.destroy({where: {}})
}