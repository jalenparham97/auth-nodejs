const express = require('express')
const http = require('http')
const socket = require('socket.io')
const volleyball = require('volleyball')
const cors = require('cors')

require('dotenv').config()

// Routes
const auth = require('./routes/auth')

const app = express()
const server = http.createServer(app)

app.use(volleyball)
app.use(cors({
  origin: 'http://localhost:8080'
}))
app.use(express.json())
app.use('/auth', auth)

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500)
  res.json({
    message: err.message,
    stack: err.stack
  })
}

app.use(errorHandler)

const port = process.env.PORT || 8081

server.listen(port, () => console.log('Listening on port:', port))

// // Initializing socket.io
// const io = socket(server)

// // Socket.io Events
// io.on('connection', socket => {
//   console.log('Connected')

//   socket.on('disconnect', () => {
//     console.log('Disconnected')
//   }) 
// })