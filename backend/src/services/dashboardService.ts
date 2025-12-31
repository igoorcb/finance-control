import { prisma } from '../utils/prisma';
import { DashboardSummary, ExpenseByCategory } from '../types';

export const dashboardService = {
  async getSummary(month: number, year: number): Promise<DashboardSummary> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Total balance de todas as contas
    const accounts = await prisma.account.findMany({
      where: { isActive: true },
    });

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.currentBalance, 0);

    // Receitas do mês
    const incomeTransactions = await prisma.transaction.findMany({
      where: {
        type: 'receita',
        status: 'confirmada',
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const monthIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

    // Despesas do mês
    const expenseTransactions = await prisma.transaction.findMany({
      where: {
        type: 'despesa',
        status: 'confirmada',
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const monthExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance,
      monthIncome,
      monthExpenses,
      monthBalance: monthIncome - monthExpenses,
    };
  },

  async getExpensesByCategory(month: number, year: number): Promise<ExpenseByCategory[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const transactions = await prisma.transaction.findMany({
      where: {
        type: 'despesa',
        status: 'confirmada',
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    });

    // Agrupar por categoria
    const grouped = transactions.reduce((acc, t) => {
      const existing = acc.find((item) => item.categoryId === t.categoryId);

      if (existing) {
        existing.total += t.amount;
      } else {
        acc.push({
          categoryId: t.categoryId,
          categoryName: t.category.name,
          total: t.amount,
          color: t.category.color,
        });
      }

      return acc;
    }, [] as ExpenseByCategory[]);

    return grouped.sort((a, b) => b.total - a.total);
  },

  async getRecentTransactions(limit: number = 10) {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      take: limit,
      include: {
        account: true,
        category: true,
      },
    });

    return transactions;
  },
};
