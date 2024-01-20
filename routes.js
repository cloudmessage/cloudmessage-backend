import { Router } from 'express';
import { getHealth, postInstances, getInstances, getOneInstance } from './handlers.js';

const getRouter = (authorize) => {

  const router = Router();

  router.get('/health', getHealth);
  router.post('/instances', authorize, postInstances);
  router.get('/instances', authorize, getInstances);
  router.get('/instances/:inst_id', authorize, getOneInstance);

  return router;
}

export default getRouter;
