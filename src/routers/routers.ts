import { Router } from 'express';

import authRouter from '../api/auth/routers';

const rootRouters: Router = Router();

rootRouters.use('/auth', authRouter);

export default rootRouters;
