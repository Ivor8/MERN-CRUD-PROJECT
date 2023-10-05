const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors()) // to access our server site in our front end
app.use(express.json()) //for parcing data from our front end to back end

mongoose.connect("mongodb://127.0.0.1:27017/crud")

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.put('/updateUser/:id', (req, res) =>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
     name: req.body.name,
     email: req.body.email,
     age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/createuser", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(5000, () => {
    console.log("server is running");
})