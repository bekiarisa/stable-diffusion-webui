import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidation } from '../middleware/validation.js';
import { chatWithAi, summarizeDocument } from '../controllers/aiController.js';

const router = Router();

router.post(
  '/',
  body('messages').isArray({ min: 1 }),
  handleValidation,
  chatWithAi
);

router.post(
  '/summarize',
  body('document').isString(),
  handleValidation,
  summarizeDocument
);

export default router;
