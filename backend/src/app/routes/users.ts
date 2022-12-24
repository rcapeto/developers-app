import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from 'src/app/controllers/user/create';
import { CreateUserUsecase } from '@app/usecases/users/create/create-user-usecase';
import { PrismaUserRepository } from '@database/user/PrismaUserRepository';
import { multerConfig } from '@config/multer';

const userRoutes = Router();
const upload = multer(multerConfig.users);

//create user
const prismaRepository = new PrismaUserRepository();
const createUserUsecase = new CreateUserUsecase(prismaRepository);
const createUserController = new CreateUserController(createUserUsecase);

const createUser = createUserController.handle.bind(createUserController);
//create user

userRoutes.post('/users', upload.single('avatar_url'), createUser);

export default userRoutes;
