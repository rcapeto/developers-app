import { DevelopersAllController } from '@application/controllers/developers/developers-all-controller';
import { AllDevelopersUsecase } from '@application/usecases/developers/all/all-developers-usecase';
import { DevelopersPrismaRepository } from '@database/developers/developers-prisma-repository';

const repository = new DevelopersPrismaRepository();
const usecase = new AllDevelopersUsecase(repository);
const controller = new DevelopersAllController(usecase);

export const getAll = controller.handle.bind(controller);
