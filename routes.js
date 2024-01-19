import { Router } from 'express';
import { getHealth, postInstances, getInstances, getOneInstance } from './handlers.js';
import authorize from './authorization.js';

const router = Router();

router.get('/health', getHealth);
router.post('/instances', authorize, postInstances);
router.get('/instances', authorize, getInstances);
router.get('/instances/:inst_id', authorize, getOneInstance);

export default router;
