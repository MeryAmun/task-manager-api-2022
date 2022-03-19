console.log('Task Manager App')
const express = require('express')
const connectDb = require('./db/connect')
require('dotenv').config()
const taskRoute = require('./routes/taskRoute')
const app = express()
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
//middleware
app.use(express.json())
//static files serve
app.use(express.static('./public'))

//routes
app.use('/api/v1/tasks', taskRoute)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL)

    app.listen(port, () => {
      console.log(`Hello world, server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
