import mongoose from 'mongoose'
import { getSecret } from '../utils/gcp_secrets'
import Question from './Question'

const connectDb = async () => {
  let dbUrl

  if (process.env.GOOGLE_CLOUD_PROJECT) {
    //production database
    dbUrl = await getSecret('DATABASE_URL')
  } else {
    //local database
    dbUrl = process.env.DATABASE_URL
  }

  return mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

const models = { Question }

export { connectDb }

export default models
