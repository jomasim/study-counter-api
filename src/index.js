import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDb } from '../src/models/index'

import questionRouter from './routes/question'

import admin from 'firebase-admin'
var firebaseMiddleware = require('express-firebase-middleware')

const serviceAccount = require('../perm.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1/question', firebaseMiddleware.auth, questionRouter)

connectDb().then(async () => {
  app.listen(8080, () => console.log(`app listening on port 8080`))
})
