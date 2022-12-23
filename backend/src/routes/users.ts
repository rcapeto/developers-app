import { Router } from 'express';
import multer from 'multer';

import { PrismaUsersRepository } from '../database/PrismaUsersRepository';

import { CreateUserUsecase } from '../usecases/users/create-user-usecase';
import { CreateUserController } from '../controllers/users/CreateUserController';

import { multerConfig } from '../../config/multer';

export const usersRoutes = Router();

const repository = new PrismaUsersRepository();
const upload = multer(multerConfig.users);

//Create User
const createUserUsecase = new CreateUserUsecase(repository);
const createUserController = new CreateUserController(createUserUsecase);
const create = createUserController.handle.bind(createUserController);
//End Create User

usersRoutes.post('/users', upload.single('avatarUrl'), create);
