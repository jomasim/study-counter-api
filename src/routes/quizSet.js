import express from 'express'
import quizSetController from '../controllers/quizSetController'
import validate from '../validators'
var firebaseMiddleware = require('express-firebase-middleware')

const quizSetRouter = express.Router()

quizSetRouter.get('/', (req, res) => quizSetController.list(req, res))
quizSetRouter.get('/:short_code', (req, res) =>
  quizSetController.getByShortCode(req, res)
)
quizSetRouter.post('/', validate.quizSet, (req, res) =>
  quizSetController.add(req, res)
)

export default quizSetRouter
