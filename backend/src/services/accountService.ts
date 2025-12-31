import { prisma } from '../utils/prisma';
import { CreateAccountDto, UpdateAccountDto } from '../types';
import { createError } from '../middlewares/errorHandler';

export const accountService = {
  async create(data: CreateAccountDto) {
    const account = await prisma.account.create({
      data: {
        ...data,
        currentBalance: data.initialBalance,
      },
    });
    return account;
  },

  async findAll() {
    const accounts = await prisma.account.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });
    return accounts;
  },

  async findById(id: string) {
    const account = await prisma.account.findUnique({
      where: { id },
      include: {
        transactions: {
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    });

    if (!account) {
      throw createError('Conta não encontrada', 404);
    }

    return account;
  },

  async update(id: string, data: UpdateAccountDto) {
    const account = await prisma.account.findUnique({ where: { id } });

    if (!account) {
      throw createError('Conta não encontrada', 404);
    }

    const updated = await prisma.account.update({
      where: { id },
      data,
    });

    return updated;
  },

  async delete(id: string) {
    const account = await prisma.account.findUnique({
      where: { id },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    if (!account) {
      throw createError('Conta não encontrada', 404);
    }

    if (account._count.transactions > 0) {
      throw createError('Não é possível excluir conta com transações', 400);
    }

    await prisma.account.delete({ where: { id } });

    return { message: 'Conta excluída com sucesso' };
  },

  async updateBalance(accountId: string, amount: number, type: 'add' | 'subtract') {
    const account = await prisma.account.findUnique({ where: { id: accountId } });

    if (!account) {
      throw createError('Conta não encontrada', 404);
    }

    const newBalance =
      type === 'add'
        ? account.currentBalance + amount
        : account.currentBalance - amount;

    await prisma.account.update({
      where: { id: accountId },
      data: { currentBalance: newBalance },
    });

    return newBalance;
  },
};
