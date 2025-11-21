import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidation } from '../middleware/validation.js';
import { getMetrics, createPurchase } from '../controllers/icoController.js';

const router = Router();

router.get('/metrics', getMetrics);
router.post(
  '/purchase',
  body('amount').isNumeric(),
  body('currency').isString(),
  body('wallet').isString(),
  handleValidation,
  createPurchase
);

export default router;
