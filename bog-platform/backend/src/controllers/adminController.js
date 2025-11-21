import { getAdminMetrics } from '../services/adminService.js';

export async function getAdminDashboard(req, res, next) {
  try {
    const metrics = await getAdminMetrics();
    res.json(metrics);
  } catch (error) {
    next(error);
  }
}
