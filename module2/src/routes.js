import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/uploads'

import SessionController from './controllers/SessionController'
import HouseController from './controllers/HouseController'
import DashboardController from './controllers/DashboardController'
import ReserveController from './controllers/ReserveController'


const routes = new Router()
const upload = multer(uploadConfig)

// Rotas de Session
routes.post('/session',  SessionController.store) 

// Rotas de House
routes.post('/house', upload.single(`thumbnail`) ,HouseController.store)
routes.get('/house', HouseController.index)
routes.put('/house/:id', upload.single(`thumbnail`) ,HouseController.update)
routes.delete('/house/:id', HouseController.destroy)

// Rotas de Dashboard
routes.get('/dashboard', DashboardController.show)

// Rotas de Reserve
routes.post('/houses/:house_id/reserve', ReserveController.store)

export default routes;