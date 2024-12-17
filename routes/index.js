import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController.js';
import AuthController from '../controllers/AuthController';

const routes = Router();

routes.get('/status', AppController.getStatus);
routes.get('/stats', AppController.getStats);
routes.post('/users', UsersController.postNew);
routes.get('/users/me', UsersController.getMe);
routes.get('/disconnect', AuthController.getDisconnect);
routes.get('/connect', AuthController.getConnect);

export default routes;
