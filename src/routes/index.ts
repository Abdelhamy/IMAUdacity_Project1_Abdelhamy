import express from 'express';
import image from './api_resize/image';

const routes = express.Router();

routes.use('/api_resize/image', image);

export default routes;
