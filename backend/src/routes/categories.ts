import { Router } from 'express';
import { categoryController } from '../controllers/categoryController';

const router = Router();

router.post('/', categoryController.create);
router.get('/', categoryController.findAll);
router.get('/:id', categoryController.findById);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

export default router;
