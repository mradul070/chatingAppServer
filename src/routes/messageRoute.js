const {Router } = require('express')
const messageController = require('../controller/messageController')
const {ensureUser} = require('../middleware/validate')
const message = require('../model/message')
const router = Router()


router.post('/message',ensureUser, messageController.createMessage)
router.get('/message', ensureUser, messageController.getMessage)
module.exports = router;