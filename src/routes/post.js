import express from 'express'
import validate from '../validators'
var firebaseMiddleware = require('express-firebase-middleware')
import postController from '../controllers/postController'

const postRouter = new express.Router()

postRouter.get('/:id', (req, res) => postController.getById(req, res))
postRouter.get('/', (req, res) => postController.getAll(req, res))
postRouter.post('/', firebaseMiddleware.auth, validate.post, (req, res) =>
  postController.create(req, res)
)
postRouter.put('/:id', firebaseMiddleware.auth, (req, res) =>
  postController.updateById(req, res)
)

export default postRouter
