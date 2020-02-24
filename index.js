const express = require('express')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//set up Express App

const app = express()

//connect to mongoDB
mongoose.connect('mongodb://localhost/talentgo')
mongoose.Promise = global.Promise

app.use(bodyParser.json())

//initialize routes
app.use('/api', routes)

//error handling middleware
app.use((err,req,res,next) => {
    res.status(422).send({error:err.message})
})

//listen for requests
app.listen(4000, () => {
    console.log('Listening')
})