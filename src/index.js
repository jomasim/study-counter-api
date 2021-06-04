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

app.use('/api/v1/question', firebaseMiddleware.auth, questionRouter)

connectDb().then(async () => {
  let params
  if (process.env.GOOGLE_CLOUD_PROJECT) {
    const data = await getSecret(process.env.FIREBASE_PERMISSIONS)
    const result = JSON.parse(data)
    params = {
      type: result.type,
      projectId: result.project_id,
      privateKeyId: result.private_key_id,
      privateKey: result.private_key,
      clientEmail: result.client_email,
      clientId: result.client_id,
      authUri: result.auth_uri,
      tokenUri: result.token_uri,
      authProviderX509CertUrl: result.auth_provider_x509_cert_url,
      clientC509CertUrl: result.client_x509_cert_url
    }
  } else {
    params = process.env.FIREBASE_PERMISSIONS
  }

  admin.initializeApp({
    credential: admin.credential.cert(params)
  })

  app.listen(8080, () => console.log(`app listening on port 8080`))
})
