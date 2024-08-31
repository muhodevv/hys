import authRoutes from './auth.route';
import storeRoutes from './stores.route';
import type { Express } from 'express';

const initRoutes = (app: Express) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/stores', storeRoutes);
}

export default initRoutes;