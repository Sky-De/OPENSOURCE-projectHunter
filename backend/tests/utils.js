import { User } from "../src/models/user"
import { seq } from "../src/models/connection";

export {
    setupDatabase,
    teardownDatabase
}

async function setupDatabase() {
    await User.bulkCreate([
        {
            "username": "testuser1",
            "password": "password1",
            "email": "testuser1@gmail.com",
            "firstName": "bob",
            "dob": "2023-01-01T12:00:00Z",
            "gender": "M",
            "preferences": ["F" , "T"],
            "pronoun": "Him",
            "age": 18,
            "minAge": 18,
            "maxAge": 20
        },
        {
            "username": "testuser2",
            "password": "password2",
            "email": "testuser2@gmail.com",
            "firstName": "John",
            "dob": "2020-01-01T12:00:00Z",
            "gender": "O",
            "preferences": ["F"],
            "pronoun": "Him",
            "age": 25,
            "minAge": 20,
            "maxAge": 27
        },
        {
            "username": "aGirl",
            "password": "aGirl",
            "email": "aGirl@gmail.com",
            "firstName": "aGirl",
            "dob": "2021-01-01T12:00:00Z",
            "gender": "F",
            "preferences": ["F" , "M"],
            "pronoun": "Her",
            "age": 21,
            "minAge": 21,
            "maxAge": 28
        }
    ])
    console.log("Added Test Users!")
}

async function teardownDatabase() {
    try {
        await seq.sync({ force: true }).then(() => {
            console.log('Database torn down successfully.');
            return User.destroy({where: {}, truncate: true})
        });
      } catch (error) {
        console.error('Error tearing down the database:', error);
      } finally {
        await seq.close();
      }
}