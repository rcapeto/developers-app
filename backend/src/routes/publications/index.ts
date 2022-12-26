import { serverConfig } from '@config/server';
import { ensureDeveloperIsAuthenticate } from '@middlewares/ensureDeveloperIsAuthenticate';
import { Router } from 'express';

import { getAll } from './all';
import { getAllDeveloperPublications } from './developer-all-publications';

export const publicationsRoutes = Router();

const {
  routes: { publications },
} = serverConfig;

publicationsRoutes.get(publications.all, ensureDeveloperIsAuthenticate, getAll);
publicationsRoutes.get(
  publications.allDeveloperPublications,
  ensureDeveloperIsAuthenticate,
  getAllDeveloperPublications,
);
