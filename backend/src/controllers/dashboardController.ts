import { Request, Response, NextFunction } from 'express';
import { dashboardService } from '../services/dashboardService';

export const dashboardController = {
  async getSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const month = parseInt(req.query.month as string) || new Date().getMonth() + 1;
      const year = parseInt(req.query.year as string) || new Date().getFullYear();

      const summary = await dashboardService.getSummary(month, year);
      res.json(summary);
    } catch (error) {
      next(error);
    }
  },

  async getExpensesByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const month = parseInt(req.query.month as string) || new Date().getMonth() + 1;
      const year = parseInt(req.query.year as string) || new Date().getFullYear();

      const expenses = await dashboardService.getExpensesByCategory(month, year);
      res.json(expenses);
    } catch (error) {
      next(error);
    }
  },

  async getRecentTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;

      const transactions = await dashboardService.getRecentTransactions(limit);
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  },
};
