const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require("cors")
const db = require('./db_connection')
const multer = require('multer')
const http = require("http");
const socket = require('socket.io')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { getMaxListeners } = require('./db_connection')
const StudentCourses = require('./APIs/StudentCourses')
const stripe = require("stripe")("sk_test_51JLxqKI3zG84BVe3Opq0QSdnV7uhVuLKDHlHSTQwK0hYFB0dIntf89apQBZzwHI2TXf1ZKUxWfphazVg94iza5hj0089mYihwi");
const { uuid } = require('uuidv4');
const MySQLEvents = require('@rodrigogs/mysql-events');
const schedule = require('node-schedule');
const fs = require('fs')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Content/')
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname
    cb(null, name)
  }
})

var upload = multer({ 
  storage: storage,
  preservePath: true,
  fileFilter: function(req, file, cb) {

    console.log(!file.mimetype.toString().includes("video/"))
    if( file.mimetype !== "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    && file.mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.presentation"
    && file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.presentation"
    && file.mimetype !== "application/pdf"
    && !file.mimetype.toString().includes("video/")
    && !file.mimetype.toString().includes("audio/")
    && !file.mimetype.toString().includes("image/")
    ) {
      return cb(new Error("Unsupported file format"))
    }
    cb(null, true)
  }
 })

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


require('./APIs/SignIn')(app, db)
require('./APIs/SignUp')(app, db)
require('./APIs/Registrations')(app, db)
require('./APIs/Announcements')(app, db, upload, fs)
require('./APIs/Course')(app, db, upload, fs)
require('./APIs/AllCourses')(app, db, fs)
require('./APIs/StuAllCourses')(app, db)
require('./APIs/StudentCourses')(app, db)
require('./APIs/Teachers')(app, db)
require('./APIs/TeacherPayments')(app, db, MySQLEvents, schedule)
require('./APIs/StudentAccess')(app, db, schedule)
require('dotenv').config()
require('./APIs/StudentNotification')(app, db, MySQLEvents, schedule)
require('./APIs/StudentDetails')(app, db)
require('./APIs/Feedback')(app, db)
require('./APIs/Payments')(app, db)
require('./APIs/UserSearch')(app, db)
require('./APIs/AdminHome')(app, db)
require('./APIs/PaymentStudent')(app, db, stripe, uuid, upload)
require('./APIs/TeacherHome')(app, db)
require('./APIs/stuFeedback')(app,db)
require('./APIs/StudentAnnouncement')(app,db)
require('./APIs/ViewProfile')(app,db, upload)

const server = http.createServer(app)

server.listen(3001, () => {
  console.log("Server Started")
})

require('./APIs/Chatroom.js')(socket, server)



