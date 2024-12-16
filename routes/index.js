import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController.js';
// another way is creating a factory : a function which takes
// Express app instance as an arg then set its routes

const routes = Router();

routes.get('/status', AppController.getStatus);
routes.get('/stats', AppController.getStats);
routes.get('/users', UsersController.postNew);

export default routes;
