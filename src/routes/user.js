import express from 'express'
var firebaseMiddleware = require('express-firebase-middleware')
import userController from '../controllers/userController'

const userRouter = express.Router()

userRouter.post('/', (req, res) => userController.createUser(req, res))
userRouter.get('/profile', firebaseMiddleware.auth, (req, res) =>
  userController.getUserProfile(req, res)
)

export default userRouter
