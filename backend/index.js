const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require("cors")
const db = require('./db_connection')

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


require('./APIs/SignIn')(app,db)
require('./APIs/SignUp')(app,db)
require('./APIs/CreateTeacherAcc')(app,db)
require('./APIs/CreateAnnouncement')(app,db)
require('./APIs/Course')(app,db)
require('./APIs/AllCourses')(app,db)

app.listen(3001, () => {
    console.log("Server Started")
})

