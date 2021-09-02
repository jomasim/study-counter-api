import express from 'express'
import validate from '../validators'
import fieldController from '../controllers/fieldController'
var firebaseMiddleware = require('express-firebase-middleware')

const fieldRouter = new express.Router()

fieldRouter.get('/', (req, res) => fieldController.list(req, res))

fieldRouter.post('/', firebaseMiddleware.auth, validate.field, (req, res) =>
  fieldController.add(req, res)
)

export default fieldRouter
