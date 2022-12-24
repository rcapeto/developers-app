import { serverConfig } from '@config/server';
import { Router } from 'express';

import { registerDeveloper } from './register';

export const accountRoutes = Router();

accountRoutes.post(serverConfig.routes.account.register, registerDeveloper);
