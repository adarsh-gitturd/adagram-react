// ports
// server : 8081
// client : 3001

const io = require('socket.io')(8081, {
    cors: {
        origin : ["http://localhost:3001"],
    },
})

io.on('connection', socket => {
    console.log(socket.id);
})