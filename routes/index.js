import express from 'express';
import authRoutes from './authRoutes.js';
import eventosRoutes from './events.js';
import eventosViewRoutes from './events2.js'; // ← LINHA NOVA

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/eventos', eventosRoutes);
router.use('/eventos-view', eventosViewRoutes); // ← LINHA NOVA

export default router;