import { prisma } from '../utils/prisma';
import { CreateCategoryDto, UpdateCategoryDto } from '../types';
import { createError } from '../middlewares/errorHandler';

export const categoryService = {
  async create(data: CreateCategoryDto) {
    const category = await prisma.category.create({
      data,
    });
    return category;
  },

  async findAll() {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });
    return categories;
  },

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        transactions: {
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    });

    if (!category) {
      throw createError('Categoria não encontrada', 404);
    }

    return category;
  },

  async update(id: string, data: UpdateCategoryDto) {
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw createError('Categoria não encontrada', 404);
    }

    const updated = await prisma.category.update({
      where: { id },
      data,
    });

    return updated;
  },

  async delete(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    if (!category) {
      throw createError('Categoria não encontrada', 404);
    }

    if (category._count.transactions > 0) {
      throw createError('Não é possível excluir categoria com transações', 400);
    }

    await prisma.category.delete({ where: { id } });

    return { message: 'Categoria excluída com sucesso' };
  },
};
