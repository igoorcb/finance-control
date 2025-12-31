import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController';

const router = Router();

router.get('/summary', dashboardController.getSummary);
router.get('/expenses-by-category', dashboardController.getExpensesByCategory);
router.get('/recent-transactions', dashboardController.getRecentTransactions);

export default router;
