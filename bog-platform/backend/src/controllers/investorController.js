import { getInvestorPortfolio } from '../services/investorService.js';

export async function getPortfolio(req, res, next) {
  try {
    const portfolio = await getInvestorPortfolio({ wallet: req.user?.wallet, email: req.user?.email });
    res.json(portfolio);
  } catch (error) {
    next(error);
  }
}
