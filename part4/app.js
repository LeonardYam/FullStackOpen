const { MONGODB_URI } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const loginRouter = require('./controllers/loginRouter')
const userRouter = require('./controllers/userRouter')
const blogRouter = require('./controllers/blogRouter')

logger.info(`Connecting to mongoDB - ${MONGODB_URI}`)

mongoose.connect(MONGODB_URI)
  .then(() => logger.info('Successful connection to mongoDB!'))
  .catch((err) => logger.error('Connection error: ', err.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/testRouter')
  app.use('/api/test', testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app