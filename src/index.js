import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectDb } from '../src/models/index'

import questionRouter from './routes/question'
import userRouter from './routes/user'
import fieldRouter from './routes/field'

import admin from 'firebase-admin'
import { getSecret } from './utils/gcp_secrets'
import Question from './models/Question'
import slugify from 'slugify'
import quizSetRouter from './routes/quizSet'

const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(express.json())

app.use('/update/slugs', async (req, res) => {
  const questions = await Question.find({})
  try {
    questions.forEach(async question => {
      if (!question.slug) {
        await question.update(
          { slug: slugify(question.title) },
          { upsert: true }
        )
      }
    })
    return res.send('success')
  } catch (error) {
    return res.send().json(error)
  }
})

app.use('/update/dates', async (req, res) => {
  const questions = await Question.find({})
  try {
    questions.forEach(async question => {
      if (!question.created_at) {
        question.created_at = '2021-11-01T06:22:32.374+00:00'
      }
      if (!question.updated_at) {
        question.updated_at = '2021-11-01T06:22:32.374+00:00'
      }
      question.save()
    })
    return res.send('success')
  } catch (error) {
    return res.send().json(error)
  }
})

app.use('/api/v1/quizset', quizSetRouter)
app.use('/api/v1/question', questionRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/field', fieldRouter)

connectDb().then(async () => {
  let params
  if (process.env.GOOGLE_CLOUD_PROJECT) {
    const result = await getSecret(process.env.FIREBASE_PERMISSIONS)
    params = JSON.parse(result)
  } else {
    params = process.env.FIREBASE_PERMISSIONS
  }

  admin.initializeApp({
    credential: admin.credential.cert(params)
  })

  app.listen(8080, () => console.log(`app listening on port 8080`))
})
