import { Request, Response, NextFunction } from 'express';
import { accountService } from '../services/accountService';
import { CreateAccountDto, UpdateAccountDto } from '../types';

export const accountController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateAccountDto = req.body;
      const account = await accountService.create(data);
      res.status(201).json(account);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const accounts = await accountService.findAll();
      res.json(accounts);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const account = await accountService.findById(id);
      res.json(account);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: UpdateAccountDto = req.body;
      const account = await accountService.update(id, data);
      res.json(account);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await accountService.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
