const cors = require('cors')
const express = require('express')
const app = express()
const port = 4000

const corsOptions = { 
    // origin:'https://abc.onrender.com',
    AccessControlAllowOrigin: '*',  
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
  }
app.use(cors(corsOptions))
app.use(express.json())

app.get('/user', (req,res) => { // Returns user information
    res.json({message: 'Getting user'})
})

app.post('/user', (req, res) => { // Creates an account
    const data = req.body
    res.json({message: data})
})

app.put('/user', (req, res) => { // Login
    const data = req.body
    res.json({message: data})
})

app.delete('/user', (req, res) => { // Logout
    res.json({message: 'Logged out...'})
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})