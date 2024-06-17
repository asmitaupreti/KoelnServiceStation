import express from 'express'
import cors from 'cors'

const app = express()
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))

//import routes
import stationRouter from './routes/station.routes.js'

//routes declaration
app.use('/api/stations', stationRouter)

export { app }
