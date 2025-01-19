
import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/:username', authMiddleware, getUser);
router.put('/:username', authMiddleware, updateUser);
router.delete('/:username', authMiddleware, deleteUser);

export default router;