import { prisma } from '../utils/prisma';
import { CreateTransactionDto, UpdateTransactionDto, TransactionFilters } from '../types';
import { createError } from '../middlewares/errorHandler';
import { accountService } from './accountService';

export const transactionService = {
  async create(data: CreateTransactionDto) {
    // Validar conta e categoria existem
    const account = await prisma.account.findUnique({
      where: { id: data.accountId },
    });

    if (!account) {
      throw createError('Conta não encontrada', 404);
    }

    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw createError('Categoria não encontrada', 404);
    }

    // Criar transação
    const transaction = await prisma.transaction.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
      include: {
        account: true,
        category: true,
      },
    });

    // Atualizar saldo da conta
    if (transaction.status === 'confirmada') {
      const balanceType = transaction.type === 'receita' ? 'add' : 'subtract';
      await accountService.updateBalance(data.accountId, data.amount, balanceType);
    }

    return transaction;
  },

  async findAll(filters?: TransactionFilters) {
    const where: any = {};

    if (filters?.startDate || filters?.endDate) {
      where.date = {};
      if (filters.startDate) {
        where.date.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.date.lte = new Date(filters.endDate);
      }
    }

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.accountId) {
      where.accountId = filters.accountId;
    }

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        account: true,
        category: true,
      },
    });

    return transactions;
  },

  async findById(id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        account: true,
        category: true,
      },
    });

    if (!transaction) {
      throw createError('Transação não encontrada', 404);
    }

    return transaction;
  },

  async update(id: string, data: UpdateTransactionDto) {
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw createError('Transação não encontrada', 404);
    }

    // Se status mudou para confirmada ou valor mudou, recalcular saldo
    if (existingTransaction.status === 'confirmada') {
      // Reverter saldo anterior
      const reverseType = existingTransaction.type === 'receita' ? 'subtract' : 'add';
      await accountService.updateBalance(
        existingTransaction.accountId,
        existingTransaction.amount,
        reverseType
      );
    }

    // Atualizar transação
    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
      include: {
        account: true,
        category: true,
      },
    });

    // Aplicar novo saldo se confirmada
    if (updated.status === 'confirmada') {
      const balanceType = updated.type === 'receita' ? 'add' : 'subtract';
      await accountService.updateBalance(updated.accountId, updated.amount, balanceType);
    }

    return updated;
  },

  async delete(id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw createError('Transação não encontrada', 404);
    }

    // Reverter saldo se confirmada
    if (transaction.status === 'confirmada') {
      const reverseType = transaction.type === 'receita' ? 'subtract' : 'add';
      await accountService.updateBalance(
        transaction.accountId,
        transaction.amount,
        reverseType
      );
    }

    await prisma.transaction.delete({ where: { id } });

    return { message: 'Transação excluída com sucesso' };
  },
};
