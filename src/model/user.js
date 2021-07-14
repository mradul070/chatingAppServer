const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter a email'],
        unique: [true, 'Duplicate'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [6, 'The password should be atleast 6 character']
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)
    next()
})
userSchema.methods.generateToken = function generateToken () {
	const user = this
	return jwt.sign({
		_id: user._id
    }, 'chatroom secret', {
        expiresIn: '5m'
    })
}
userSchema.methods.validatePassword = function validatePassword (password) {
	const user = this
	return new Promise((resolve, reject) => {
		try {
			let isMatch = bcrypt.compareSync(password, user.password)
			resolve(isMatch)
		} catch (error) {
			resolve(false)
		}
	})
}
const user = mongoose.model('user', userSchema)
module.exports = user