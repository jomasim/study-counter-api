import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
const fileUpload = require('express-fileupload')
const csv = require('csvtojson')
const { htmlToText } = require('html-to-text')
import { connectDb } from '../src/models/index'

import questionRouter from './routes/question'
import userRouter from './routes/user'
import fieldRouter from './routes/field'

import admin from 'firebase-admin'
import { getSecret } from './utils/gcp_secrets'
import Question from './models/Question'
import slugify from 'slugify'
import quizSetRouter from './routes/quizSet'
import QuizSet from './models/QuizSet'
import ShortUniqueId from 'short-unique-id'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
// enable files upload
app.use(
  fileUpload({
    createParentPath: true
  })
)

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

app.use('/update/short', async (req, res) => {
  const uid = new ShortUniqueId({ length: 10 })
  const sets = await QuizSet.find({})
  try {
    sets.forEach(async set => {
      await set.update(
        {
          slug: slugify(set.title),
          shortCode: uid()
        },
        { upsert: true }
      )
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

app.use('/upload/sets', async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).send('No file uploaded')
    }
    if (!req.files.file) {
      return res.status(400).send('File name with key file is missing')
    }
    const jsonArray = await csv().fromString(
      req.files.file.data.toString('utf8')
    )

    const single = jsonArray[0]
    const quizSetTitle = single['title']
    const subject = single['subject']
    const meta = { category: single['category'] }

    const questions = jsonArray.map(item => {
      return {
        questionTitle: item.question,
        answer: item.answer,
        image: item.image
      }
    })

    req.url = '/api/v1/quizset'
    req.method = 'post'
    req.body = {
      quizSetTitle,
      subject,
      meta,
      custom: true,
      questions
    }
    return app._router.handle(req, res, next)
  } catch (error) {
    return res.status(400).send('unknown happened')
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
