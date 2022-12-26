import { serverConfig } from '@config/server';
import { Router } from 'express';

import { registerDeveloper } from './register';
import { loginDeveloper } from './login';

export const accountRoutes = Router();

accountRoutes.post(serverConfig.routes.account.register, registerDeveloper);
accountRoutes.post(serverConfig.routes.account.login, loginDeveloper);
