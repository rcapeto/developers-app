import { Router } from 'express';
import multer from 'multer';
import { multerConfig } from '@config/multer';

import { createUser } from './user/create';
import { findMany } from './user/findMany';

const userRoutes = Router();
const upload = multer(multerConfig.users);

userRoutes.post('/users', upload.single('avatar_url'), createUser);
userRoutes.get('/users', findMany);

export default userRoutes;
