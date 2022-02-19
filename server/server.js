const io = require('socket.io')(3000, {
  cors: {
    origin: ['http://localhost:8080']
  }
})

// runs every time a client connects to our server
// ..and its gonna give a socket instance for each one of them
io.on('connection', socket => {
  //console.log(socket.id)
  socket.on('send-msg', (msg, room) => {
    if(room === ''){
      //console.log(num, str, obj)
      //console.log(msg)
  
      // server sends msg to every socket 
      // ..client has to listen for it of course
      // ..to prevent that the one who sends msg in the first place
      // ..we have to broadcast (server knows who send the msg and therefore
      // sends it only to the other clients)
      socket.broadcast.emit('receive-msg', msg)
    } else {
      // ..and if the client has sent a room (broadcast is implicit)
      socket.to(room).emit('receive-msg', msg)
      // every socket is in a room which is the same as their id !!
      // -> by putting the id of the client (socket), which you want to 
      // chat with, in the room field, you send a private msg only to this client
    }
  })
})
