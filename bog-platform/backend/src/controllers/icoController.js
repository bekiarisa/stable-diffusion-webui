import { getIcoMetrics, recordPurchase } from '../services/icoService.js';

export async function getMetrics(req, res, next) {
  try {
    const metrics = await getIcoMetrics();
    res.json(metrics);
  } catch (error) {
    next(error);
  }
}

export async function createPurchase(req, res, next) {
  try {
    const purchase = await recordPurchase(req.body);
    res.status(201).json(purchase);
  } catch (error) {
    next(error);
  }
}
