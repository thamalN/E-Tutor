const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require("cors")
const db = require('./db_connection')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Content/')
    },
    filename: function (req, file, cb) {
      const name = file.originalname
      cb(null, name)
    }
  })
  
var upload = multer({ storage: storage, preservePath: true })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require('./APIs/SignIn')(app,db)
require('./APIs/CreateTeacherAcc')(app,db)
require('./APIs/CreateAnnouncement')(app,db)
require('./APIs/Course')(app,db, upload)
require('./APIs/AllCourses')(app,db)


app.listen(3001, () => {
    console.log("Server Started")
})

