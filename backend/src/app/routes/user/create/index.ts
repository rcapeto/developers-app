import { CreateUserController } from '@app/controllers/user/create';
import { CreateUserUsecase } from '@app/usecases/users/create/create-user-usecase';
import { PrismaUserRepository } from '@database/user/PrismaUserRepository';

const repository = new PrismaUserRepository();
const usecase = new CreateUserUsecase(repository);
const controller = new CreateUserController(usecase);

const createUser = controller.handle.bind(controller);

export { createUser };
