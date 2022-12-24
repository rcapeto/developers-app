import { AccountController } from '@application/controllers/account/account-controller';
import { AccountRegisterUsecase } from '@application/usecases/account/register-usecase';
import { AccountPrismaRepository } from '@database/account/account-prisma-repository';

const repository = new AccountPrismaRepository();
const usecase = new AccountRegisterUsecase(repository);
const controller = new AccountController(usecase);

const registerDeveloper = controller.handle.bind(controller);

export { registerDeveloper };
