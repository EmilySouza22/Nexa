import express from 'express';
import authRoutes from './authRoutes.js';
import eventosRoutes from './events.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/eventos', eventosRoutes);

export default router;
