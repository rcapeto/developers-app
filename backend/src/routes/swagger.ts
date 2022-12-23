import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

import { swaggerConfig } from '../../config/swagger';

export const swaggerRoute = Router();

swaggerRoute.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
