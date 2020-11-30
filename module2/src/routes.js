import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/uploads'

import SessionController from './controllers/SessionController'
import HouseController from './controllers/HouseController'

const routes = new Router()
const upload = multer(uploadConfig)

// Rotas de Session
routes.post('/session',  SessionController.store)

// Rotas de House
routes.post('/house', upload.single(`thumbnail`) ,HouseController.store)

export default routes;