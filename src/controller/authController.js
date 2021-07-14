const User = require('../model/user')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const alertMessage = (error) => {
    let errors = {name: '', email: '', password: ''}
    if (error.message === 'No such email exist') {
        errors.email = 'This email not found'
    }
    if (error.message === 'Incorrect password') {
        errors.password = 'This password is incorrect'
    }
    if (error.code === 11000) {
        errors.email = 'This email already registered'
    }
    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}
module.exports.signUp = async(req, res) => {
    const {name, email, password} = req.body
    try {
        const user = new User({name, email, password})
        const userData = await user.save()
        res.status(201).json({userData})
    } catch (error) {
        // console.log(error)
        let e = alertMessage(error)
        return res.status(500).json(e) 
    }
}

module.exports.login = (req, res, next) => {
    try {
        passport.authenticate('local', (err, user) => {
          if (err || !user) {
            let e = alertMessage(err)
            return res.status(404).json(e) 
          }
          const token = user.generateToken()
          const response = user.toJSON()
          delete response.password
          delete response.__v
          res.append('Authorization', token);
          return res.status(200).json(response)
        })(req,res,next)
      } catch (error) {
        console.log(error)
        let e = alertMessage(error)
        return res.status(500).json(e)
      }
}
module.exports.getUser = async(req,res) => {
    try {
        const users = await User.findOne({_id: req.user._id}, '-password -__v')
		return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(error.status).json(error.message)
    }
}
module.exports.logout = (req, res) => {
   let header = req.headers.authorization
   const token = header.split(' ')[1]
    res.send('logout')
}