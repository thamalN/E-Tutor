module.exports = function(socket, server) {
    
io = socket(server, {
    cors: {
      origin: ["https://etutor-ucsc.herokuapp.com", "http://localhost:3000"],
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
}