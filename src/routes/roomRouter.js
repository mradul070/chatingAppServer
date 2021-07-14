const {Router } = require('express')
const roomController = require('../controller/room')
const {ensureUser} = require('../middleware/validate')
const router = Router()


router.get('/room',ensureUser, roomController.getRooms)
router.post('/room', ensureUser, roomController.addRoom)
module.exports = router;