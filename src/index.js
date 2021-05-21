import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import questionRouter from './routes/question'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/questions', questionRouter)
app.listen(8080, () => console.log('app running on port 8080!'))
