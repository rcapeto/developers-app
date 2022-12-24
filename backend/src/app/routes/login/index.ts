import { AuthenticateUserController } from '@app/controllers/authenticate';
import { AuthenticateLoginUsecase } from '@app/usecases/authenticate/login/login-usecase';
import { PrismaUserRepository } from '@database/user/PrismaUserRepository';
import { Router } from 'express';

const loginRoutes = Router();

const repository = new PrismaUserRepository();
const usecase = new AuthenticateLoginUsecase(repository);
const controller = new AuthenticateUserController(usecase);

const authenticate = controller.handle.bind(controller);

loginRoutes.post('/login', authenticate);

export default loginRoutes;
