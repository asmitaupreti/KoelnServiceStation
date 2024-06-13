import { app } from './app.js'
import connectDB from './db/index.js'
import 'dotenv/config'

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.on('error', (error) => {
    console.log('ERROR', error)
    throw error
  })
  app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`)
  })
})
