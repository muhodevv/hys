import authRoutes from './auth.route';
import type { Express } from 'express';

const initRoutes = (app: Express) => {
    app.use('/api/v1/auth', authRoutes);
}

export default initRoutes;