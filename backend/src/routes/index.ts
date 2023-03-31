import { swaggerRoute } from './swagger';
import { accountRoutes } from './account';
import { developersRoutes } from './developers';
import { publicationsRoutes } from './publications';

export const routes = [
  swaggerRoute,
  accountRoutes,
  developersRoutes,
  publicationsRoutes,
];
