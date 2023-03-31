import { DeveloperFindOneController } from '@application/controllers/developers/developer-find-one-controller';
import { FindOneDeveloperUsecase } from '@application/usecases/developers/findOne/find-one-developer-usecase';
import { DevelopersPrismaRepository } from '@database/developers/developers-prisma-repository';

const repository = new DevelopersPrismaRepository();
const usecase = new FindOneDeveloperUsecase(repository);
const controller = new DeveloperFindOneController(usecase);

export const findOne = controller.handle.bind(controller);
