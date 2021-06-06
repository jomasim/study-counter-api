import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDb } from '../src/models/index'

import questionRouter from './routes/question'

import admin from 'firebase-admin'
import { getSecret } from './utils/gcp_secrets'
var firebaseMiddleware = require('express-firebase-middleware')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', async (req, res) => {
  const result = await getSecret(process.env.FIREBASE_PERMISSIONS)
  res.send(result)
})

app.use('/api/v1/question', firebaseMiddleware.auth, questionRouter)

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
