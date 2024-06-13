import moongose from 'mongoose'
import { DB_NAME } from '../constants.js'
const connectDB = async () => {
  try {
    const connectionInstance = await moongose.connect(
      `${process.env.MONGODB_URL}//${DB_NAME}`
    )
    console.log(
      `\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    )
  } catch (error) {
    console.log('Mongodb connection FAILED', error)
    process.exit(1)
  }
}

export default connectDB
