import { User } from "../src/models/user"
import { seq } from "../src/models/connection";
import { makeServer } from "../src/app";

export {
    setupDatabase,
    teardownDatabase
}

async function setupDatabase() {
    makeServer()
    // await User.create({
    //     "username": "testuser1",
    //     "password": "password1",
    //     "email": "testuser1@gmail.com",
    //     "firstName": "bob",
    //     "dob": "2023-01-01T12:00:00Z",
    //     "gender": "M",
    //     "preferences": ["F" , "T"],
    //     "pronoun": "Him",
    //     "age": 18,
    //     "minAge": 18,
    //     "maxAge": 20
    // })
}

async function teardownDatabase(container) {

}