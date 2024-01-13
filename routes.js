import { Router } from 'express';
import { getHealth, postInstances, getInstances, getOneInstance } from './handlers.js';

const router = Router();

router.get('/health', getHealth);
router.post('/instances', postInstances);
router.get('/instances', getInstances);
router.get('/instances/:inst_id', async (req, res) => {
  return getOneInstance(req.params.inst_id);
});

export default router;
