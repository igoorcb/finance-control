import { Router } from 'express';
import { accountController } from '../controllers/accountController';

const router = Router();

router.post('/', accountController.create);
router.get('/', accountController.findAll);
router.get('/:id', accountController.findById);
router.put('/:id', accountController.update);
router.delete('/:id', accountController.delete);

export default router;
