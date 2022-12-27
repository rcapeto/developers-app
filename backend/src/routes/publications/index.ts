import multer from 'multer';
import { Router } from 'express';

import { multerConfig } from '@config/multer';
import { serverConfig } from '@config/server';
import { ensureDeveloperIsAuthenticate } from '@middlewares/ensureDeveloperIsAuthenticate';

import { getAll } from './all';
import { getAllDeveloperPublications } from './developer-all-publications';
import { create } from './create';
import { deletePublication } from './delete';
import { updatePublication } from './update';
import { findOne } from './findOne';

export const publicationsRoutes = Router();

const multerPath = multer(multerConfig.publications);

const {
  routes: { publications },
} = serverConfig;

publicationsRoutes.get(publications.all, ensureDeveloperIsAuthenticate, getAll);

publicationsRoutes.get(
  publications.allDeveloperPublications,
  ensureDeveloperIsAuthenticate,
  getAllDeveloperPublications,
);

publicationsRoutes.post(
  publications.create,
  multerPath.single('thumbnail'),
  ensureDeveloperIsAuthenticate,
  create,
);

publicationsRoutes.put(
  publications.update,
  multerPath.single('thumbnail'),
  ensureDeveloperIsAuthenticate,
  updatePublication,
);

publicationsRoutes.delete(
  publications.delete,
  ensureDeveloperIsAuthenticate,
  deletePublication,
);

publicationsRoutes.get(
  publications.findOne,
  ensureDeveloperIsAuthenticate,
  findOne,
);
