const express = require('express')
const http = require('http')
const app = express();
const cors = require('cors')
const server = http.createServer(app);
const socket = require('./src/utils/socketIo').socket(server)
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus:200,
  exposedHeaders: 'Authorization'
}
app.use(cors(corsOptions))
const authRoutes = require('./src/routes/authRoutes')
const roomRoutes = require('./src/routes/roomRouter')
const messageRoutes = require('./src/routes/messageRoute')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const initializePassport =  require('./config/passport')


app.use(express.json())
app.use(cookieParser())
initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())
require('./src/middleware/database')
app.use(authRoutes)
app.use(roomRoutes)
app.use(messageRoutes)

const PORT = process.env.PORT || 3002;


server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});