import { FindManyUserController } from '@app/controllers/user/findMany';
import { FindManyUsersUsecase } from '@app/usecases/users/findMany/find-many-users-usecase';
import { PrismaUserRepository } from '@database/user/PrismaUserRepository';

const repository = new PrismaUserRepository();
const usecase = new FindManyUsersUsecase(repository);
const controller = new FindManyUserController(usecase);

const findMany = controller.handle.bind(controller);

export { findMany };
