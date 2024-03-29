import express from 'express'
var firebaseMiddleware = require('express-firebase-middleware')
import validate from '../validators'
import bidController from '../controllers/bidController'

const bidRouter = new express.Router()

bidRouter.get('/', (req, res) => bidController.list(req, res))
bidRouter.get('/question/:question_id', (req, res) =>
  bidController.listByQuestion(req, res)
)
bidRouter.get('/user/:question_id', firebaseMiddleware.auth, (req, res) =>
  bidController.bidByUser(req, res)
)
bidRouter.get('/tutor/in-progress', firebaseMiddleware.auth, (req, res) =>
  bidController.getTutorInProgress(req, res)
)
bidRouter.get('/tutor/completed', firebaseMiddleware.auth, (req, res) =>
  bidController.getTutorCompleted(req, res)
)
bidRouter.get('/tutor/stats', firebaseMiddleware.auth, (req, res) =>
  bidController.getTutorStats(req, res)
)
bidRouter.post('/update/:id', firebaseMiddleware.auth, (req, res) =>
  bidController.acceptBid(req, res)
)
bidRouter.post('/create', firebaseMiddleware.auth, validate.bid, (req, res) =>
  bidController.add(req, res)
)

export default bidRouter
