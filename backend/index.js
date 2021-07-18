const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require("cors")
const db = require('./db_connection')
const multer = require('multer')
const http = require("http");
const socket = require('socket.io')




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
require('./APIs/SignUp')(app,db)
require('./APIs/CreateTeacherAcc')(app,db)
require('./APIs/CreateAnnouncement')(app,db)
require('./APIs/Course')(app,db, upload)
require('./APIs/AllCourses')(app,db)
require('./APIs/StudentCourses')(app,db)

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
  console.log(socket.id)

  socket.on('join_chat', (data) => {
    socket.join(data)
    console.log("user joined " + data)
  })

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data.content)
  })

  socket.on('disconnect', () => {
    console.log("user disconnected")
  })
  
})