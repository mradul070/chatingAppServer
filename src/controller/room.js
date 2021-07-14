const Room = require('../model/room')
const io = require('../utils/socketIo').io
module.exports.getRooms = async (req, res) => {
    try {
        const loggedInUser = req.user
        if (!loggedInUser) {
            return res.status(404).json({message: 'User Not Found'})
        }
        let rooms = await Room.find()
        if (!rooms.length) {
            return res.status(404).json({message: 'Room Not Found'})
        }
        res.status(200).json({rooms})

    } catch (error) {
        console.log(error)
    }
}
module.exports.addRoom = async (req,res) => {
    try {
        let loggedInUser = req.user
        let checkRoom = await Room.find().where({name: req.body.name})
        if (checkRoom.length) {
            return res.status(404).json({error: 'Room name already exist'})
        }
        let room = new Room({
            name: req.body.name,
            userId: loggedInUser._id
        })
        let roomData = await room.save()
        io.emit('room-created', roomData)
        res.status(200).json({roomData})
    } catch (error) {
        console.log(error)
    }
}