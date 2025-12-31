import { Router } from 'express';
import { transactionController } from '../controllers/transactionController';

const router = Router();

router.post('/', transactionController.create);
router.get('/', transactionController.findAll);
router.get('/:id', transactionController.findById);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

export default router;
