import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDb } from '../src/models/index'

import questionRouter from './routes/question'

import admin from 'firebase-admin'
import { getSecret } from './utils/gcp_secrets'
var firebaseMiddleware = require('express-firebase-middleware')
let serviceAccount

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1/question', firebaseMiddleware.auth, questionRouter)

connectDb().then(async () => {
  //firebase admin permissions

  if (process.env.GOOGLE_CLOUD_PROJECT) {
    serviceAccount = await getSecret(process.env.FIREBASE_ADMIN_PERMISSIONS)
  } else {
    serviceAccount = require('../perm.json')
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })

  app.listen(8080, () => console.log(`app listening on port 8080`))
})
