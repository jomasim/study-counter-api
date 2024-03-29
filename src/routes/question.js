import express from 'express'
import questionController from '../controllers/questionController'
import validate from '../validators'
var firebaseMiddleware = require('express-firebase-middleware')

const questionRouter = express.Router()

questionRouter.get('/slugs', (req, res) =>
  questionController.getQuestionSlugs(req, res)
)
questionRouter.get('/', (req, res) => questionController.list(req, res))
questionRouter.get('/available', (req, res) =>
  questionController.availableQuestions(req, res)
)
questionRouter.get('/owner', firebaseMiddleware.auth, (req, res) =>
  questionController.listByAuthor(req, res)
)
questionRouter.get('/:slug', (req, res) =>
  questionController.getBySlug(req, res)
)
questionRouter.post(
  '/',
  firebaseMiddleware.auth,
  validate.question,
  (req, res) => questionController.add(req, res)
)
questionRouter.post(
  '/update/:id',
  firebaseMiddleware.auth,
  validate.answer,
  (req, res) => questionController.answer(req, res)
)
export default questionRouter
