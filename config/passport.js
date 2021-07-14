const LocalStrategy = require('passport-local')
const User = require('../src/model/user')
function initilize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email: email })
        if(user == null) {
            return done({message: 'No such email exist'}, false)
        }
        try {
			const isMatch = await user.validatePassword(password)
			if (!isMatch) { return done({ message:'Incorrect password'}, false ) }
			done(null, user)
		} catch (err) {
			done(err)
		}
    }
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, authenticateUser))
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser(async (id, done) => { 
        try {
            const user = await User.findById(id, '-password')
            done(null, user)
        } catch (err) {
            done(err)
        }
    })
}
module.exports = initilize