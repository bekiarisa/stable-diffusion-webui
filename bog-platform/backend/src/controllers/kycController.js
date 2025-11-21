import { initiateKyc, processKycWebhook } from '../services/kycService.js';

export async function startKyc(req, res, next) {
  try {
    const response = await initiateKyc(req.body.wallet);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

export async function kycWebhook(req, res, next) {
  try {
    await processKycWebhook(req.body);
    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
}
