const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
    }
})
const room = mongoose.model('room', roomSchema)
module.exports = room