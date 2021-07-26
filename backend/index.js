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

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

require('./APIs/SignIn')(app,db)
require('./APIs/SignUp')(app,db)
require('./APIs/Registrations')(app,db)
require('./APIs/CreateAnnouncement')(app,db)
require('./APIs/Course')(app,db, upload)
require('./APIs/AllCourses')(app,db)
require('./APIs/StudentCourses')(app,db)
require('./APIs/Teachers')(app,db)
require('dotenv').config()
require('./APIs/StudentNotification')(app,db)
require('./APIs/StudentDetails')(app,db)

const server = http.createServer(app)

server.listen(3001, () => {
    console.log("Server Started")
})

io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {

  socket.on('join_chat', (data) => {
    socket.join(data.room)
    console.log(data.user + " joined room " + data.room)
  })

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data.content)
  })

  socket.on('leave_chat', (data) => {
    socket.leave(data.room)
    console.log(data.user + " left room " + data.room)
  })

  socket.on('disconnect', (reason) => {
    console.log("user disconnected due to " + reason)
  })
  
})