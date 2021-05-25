import mongoose from 'mongoose'
import Question from './Question'

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

const models = { Question }

export { connectDb }

export default models
