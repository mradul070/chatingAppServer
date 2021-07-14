const socketIo = require('socket.io');
const room = require('../model/room');

exports.socket = function (server) {
    const io = socketIo(server);
    io.on('connection',(socket) => {
        console.log('user connected')
        socket.on('join', ({name, roomId, userId}) => {
            console.log(roomId)
        socket.join(roomId)
        })

    })
    exports.io = io;
}