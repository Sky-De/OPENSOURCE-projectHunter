import cors from 'cors'
import express from 'express'
import { Sequelize } from 'sequelize';

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
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

seq.sync()
//--------------------------


const app = express()
const port = 4000

const corsOptions = { 
    AccessControlAllowOrigin: '*',  
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
  }
  
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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})