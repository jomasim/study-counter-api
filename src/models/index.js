import mongoose from 'mongoose'
import { getSecret } from '../utils/gcp_secrets'
import Question from './Question'

// const dbUrl = process.env.GOOGLE_CLOUD_PROJECT
//   ? getSecret('DATABASE_URL')
//   : process.env.DATABASE_URL

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

const models = { Question }

export { connectDb }

export default models
