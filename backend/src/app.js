import express from 'express'
import cors from 'cors'
import sanitize from 'express-mongo-sanitize'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: 'Too many requests from this IP, please try again later',
})

const app = express()
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))

app.use(helmet())
app.use(sanitize({ allowDots: true }))
app.use(limiter)

//import routes
import stationRouter from './routes/station.routes.js'

//routes declaration
app.use('/api/stations', stationRouter)

export { app }
