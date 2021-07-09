import express from 'express'
import userController from '../controllers/userController'

const userRouter = express.Router()

userRouter.post('/', (req, res) => userController.createUser(req, res))

export default userRouter
