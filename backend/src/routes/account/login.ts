import { AccountLoginController } from '@application/controllers/account/account-login-controller';
import { AccountLoginUsecase } from '@application/usecases/account/login/login-usecase';
import { AccountPrismaRepository } from '@database/account/account-prisma-repository';

const repository = new AccountPrismaRepository();
const usecase = new AccountLoginUsecase(repository);
const controller = new AccountLoginController(usecase);

const loginDeveloper = controller.handle.bind(controller);

export { loginDeveloper };
