import { Request, Response, NextFunction } from 'express';
import { transactionService } from '../services/transactionService';
import { CreateTransactionDto, UpdateTransactionDto, TransactionFilters } from '../types';

export const transactionController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateTransactionDto = req.body;
      const transaction = await transactionService.create(data);
      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters: TransactionFilters = {
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
        categoryId: req.query.categoryId as string,
        accountId: req.query.accountId as string,
        type: req.query.type as string,
        status: req.query.status as string,
      };

      const transactions = await transactionService.findAll(filters);
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const transaction = await transactionService.findById(id);
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: UpdateTransactionDto = req.body;
      const transaction = await transactionService.update(id, data);
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await transactionService.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
