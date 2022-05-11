import express from 'express'
import questionController from '../controllers/questionController'
import validate from '../validators'
var firebaseMiddleware = require('express-firebase-middleware')

const questionRouter = express.Router()

questionRouter.get('/', (req, res) => questionController.list(req, res))
questionRouter.get('/owner', firebaseMiddleware.auth, (req, res) =>
  questionController.listByAuthor(req, res)
)
// questionRouter.get('/:slug', (req, res) =>
//   questionController.getBySlug(req, res)
// )
questionRouter.get('/:short_code', (req, res) =>
  questionController.getByShortCode(req, res)
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
