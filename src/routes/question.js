import express from 'express'
import questionController from '../controllers/questionController'
import validate from '../validators'

const questionRouter = express.Router()

questionRouter.get('/', (req, res) => questionController.list(req, res))
questionRouter.post('/', validate.question, (req, res) =>
  questionController.add(req, res)
)

export default questionRouter
