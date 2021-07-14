const User = require('../model/user')
const {getToken} = require('../utils/auth')
const {verify} = require('jsonwebtoken')

module.exports.ensureUser =  async function (req,res, next) {
    const token = getToken(req,res)
	if (!token) {
		return next(401)
	}

	let decoded = null
	try {
        decoded = verify(token, 'chatroom secret')
	} catch (err) {
		return next(err)
	}
	let user = await User.findById(decoded._id, '-password')
    req.user = user
    if (!req.user) {
		return next(401)
	}

	return next()
}
