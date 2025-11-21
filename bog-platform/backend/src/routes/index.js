import { Router } from 'express';
import icoRouter from './ico.js';
import investorRouter from './investor.js';
import aiRouter from './ai.js';
import kycRouter from './kyc.js';
import adminRouter from './admin.js';

const router = Router();

router.use('/ico', icoRouter);
router.use('/investor', investorRouter);
router.use('/ai', aiRouter);
router.use('/kyc', kycRouter);
router.use('/admin', adminRouter);

export default router;
