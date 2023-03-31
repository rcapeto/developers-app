import { AccountRegisterController } from '@application/controllers/account/account-register-controller';
import { AccountRegisterUsecase } from '@application/usecases/account/register/register-usecase';
import { AccountPrismaRepository } from '@database/account/account-prisma-repository';

const repository = new AccountPrismaRepository();
const usecase = new AccountRegisterUsecase(repository);
const controller = new AccountRegisterController(usecase);

const registerDeveloper = controller.handle.bind(controller);

export { registerDeveloper };
