import express from 'express'
import quizSetController from '../controllers/quizSetController'
import validate from '../validators'
var firebaseMiddleware = require('express-firebase-middleware')

const quizSetRouter = express.Router()
quizSetRouter.get('/slugs', (req, res) =>
  quizSetController.getQuizSetSlugs(req, res)
)
quizSetRouter.get('/', (req, res) => quizSetController.list(req, res))
quizSetRouter.get('/:short_code', (req, res) =>
  quizSetController.getByShortCode(req, res)
)
quizSetRouter.post('/', firebaseMiddleware.auth, validate.quizSet, (req, res) =>
  quizSetController.add(req, res)
)

export default quizSetRouter
