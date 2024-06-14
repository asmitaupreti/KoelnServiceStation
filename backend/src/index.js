import { app } from './app.js'
import connectDB from './db/index.js'
import 'dotenv/config'
import { seedDataBase } from './db/seed.js'

const PORT = process.env.PORT || 5000

connectDB().then(async () => {
  await seedDataBase()
  app.on('error', (error) => {
    console.log('ERROR', error)
    throw error
  })
  app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`)
  })
})
