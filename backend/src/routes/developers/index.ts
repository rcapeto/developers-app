import { Router } from 'express';
import multer from 'multer';

import { serverConfig } from '@config/server';
import { ensureDeveloperIsAuthenticate } from '@middlewares/ensureDeveloperIsAuthenticate';
import { getAll } from './all';
import { deleteDeveloper } from './delete';
import { findOne } from './findOne';
import { me } from './me';
import { updateGithub } from './update-github';
import { update } from './update';
import { multerConfig } from '@config/multer';

export const developersRoutes = Router();

const multerPath = multer(multerConfig.developers);

const {
  routes: { developers },
} = serverConfig;

developersRoutes.get(developers.all, ensureDeveloperIsAuthenticate, getAll);

developersRoutes.delete(
  developers.delete,
  ensureDeveloperIsAuthenticate,
  deleteDeveloper,
);

developersRoutes.get(
  developers.findOne,
  ensureDeveloperIsAuthenticate,
  findOne,
);

developersRoutes.get(developers.me, ensureDeveloperIsAuthenticate, me);

developersRoutes.patch(
  developers.updateGithub,
  ensureDeveloperIsAuthenticate,
  updateGithub,
);

developersRoutes.put(
  developers.update,
  multerPath.single('avatar_url'),
  ensureDeveloperIsAuthenticate,
  update,
);
