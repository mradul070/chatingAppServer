const Message = require('../model/message')
const io = require('../utils/socketIo').io
module.exports.createMessage = async (req,res) => {
    try {
        let loggedInUser = req.user
        let message = new Message({
            name: loggedInUser.name,
            userId: loggedInUser._id,
            roomId: req.body.roomId,
            text: req.body.message
        })
        let messageData = await message.save()
        io.to( req.body.roomId).emit('message', messageData)
        res.status(200).json({messageData})
    } catch (error) {
        console.log(error)
    }
}

module.exports.getMessage = async (req, res) => {
    try {
        const roomId = req.query.roomId;
        let message = await Message.find().where({roomId: roomId})
        res.status(200).json(message)
    } catch (error) {
        console.log(error)       
    }
}