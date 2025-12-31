import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/categoryService';
import { CreateCategoryDto, UpdateCategoryDto } from '../types';

export const categoryController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateCategoryDto = req.body;
      const category = await categoryService.create(data);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.findAll();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await categoryService.findById(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: UpdateCategoryDto = req.body;
      const category = await categoryService.update(id, data);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await categoryService.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
