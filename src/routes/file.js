import express from 'express'
import FileController from '../controllers/FileController'
import validate from '../validators'
var firebaseMiddleware = require('express-firebase-middleware')

const FileRouter = express.Router()

FileRouter.get('/', (req, res) => FileController.list(req, res))
FileRouter.get('/owner', firebaseMiddleware.auth, (req, res) =>
  FileController.listByOwner(req, res)
)
FileRouter.get('/stats', firebaseMiddleware.auth, (req, res) =>
  FileController.userFileStats(req, res)
)
FileRouter.post('/create', firebaseMiddleware.auth, validate.file, (req, res) =>
  FileController.add(req, res)
)

export default FileRouter
