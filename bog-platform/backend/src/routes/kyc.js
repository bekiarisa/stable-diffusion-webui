import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidation } from '../middleware/validation.js';
import { startKyc, kycWebhook } from '../controllers/kycController.js';

const router = Router();

router.post('/start', body('wallet').isString(), handleValidation, startKyc);
router.post('/webhook', kycWebhook);

export default router;
