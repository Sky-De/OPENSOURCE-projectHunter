import cors from 'cors'
import express from 'express'
import { Sequelize } from 'sequelize';
// import bcrypt from 'bcrypt'

//--------------------------
const seq = new Sequelize({
    dialect: 'postgres',
    host: 'postgres_container',
    database: 'test_db',
    username: 'root',
    password: 'root',
    port: 5432,
});

const User = seq.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    dob: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    bio: {
        type: Sequelize.STRING(300),
    },
    city: {
        type: Sequelize.STRING(30),
    },
    occupation: {
        type: Sequelize.STRING(30),
    },
    gender: {
        type: Sequelize.STRING(1),
        allowNull: false,
    },
    preferences: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    },
    minAge: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    maxAge: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    distance: {
        type: Sequelize.INTEGER,
    },
});
// User.beforeCreate(async (user) => {
//     const hashp = await bcrypt.hash(user.password,10)
//     user.password = hashp
// })

seq.sync()
//--------------------------

const corsOptions = { 
    AccessControlAllowOrigin: '*',  
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
  }
 
const port = 4000

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.get('/user', async (req,res) => { // Returns user information
    res.json({message: 'Getting user'})
})

app.post('/user', async (req, res) => { // Creates an account
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
})

app.put('/user', async (req, res) => { // Login
    const data = req.body
    const user = await User.findOne({where: {username: data.username}})
    if (user){
        res.json(user)
    }
    else{
        res.status(400).send("User Not Found")
    }
})

app.delete('/user', async (req, res) => { // Logout
    res.json({message: 'Logged out...'})
})

app.put("/user", async (req, res) => {
  // Login
  const data = req.body;
  res.json({ message: data });
});

app.delete("/user", async (req, res) => {
  // Logout
  res.json({ message: "Logged out..." });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
