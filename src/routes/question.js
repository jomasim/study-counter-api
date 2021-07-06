import express from 'express'
import questionController from '../controllers/questionController'
import validate from '../validators'
var firebaseMiddleware = require('express-firebase-middleware')

const questionRouter = express.Router()

questionRouter.get('/', (req, res) => questionController.list(req, res))
questionRouter.get('/:title', (req, res) =>
  questionController.getByName(req, res)
)
questionRouter.post(
  '/',
  firebaseMiddleware.auth,
  validate.question,
  (req, res) => questionController.add(req, res)
)

export default questionRouter
