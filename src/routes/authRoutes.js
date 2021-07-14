const {Router } = require('express')
const authController = require('../controller/authController')
const router = Router()
const {ensureUser} = require('../middleware/validate')
router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.get('/currentUser', ensureUser, authController.getUser)
router.post('/logout', ensureUser ,authController.logout)

module.exports = router;