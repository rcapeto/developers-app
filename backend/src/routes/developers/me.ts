import { DeveloperMeController } from '@application/controllers/developers/developer-me-controller';
import { MeDeveloperUsecase } from '@application/usecases/developers/me/developer-me-usecase';
import { DevelopersPrismaRepository } from '@database/developers/developers-prisma-repository';

const repository = new DevelopersPrismaRepository();
const usecase = new MeDeveloperUsecase(repository);
const controller = new DeveloperMeController(usecase);

export const me = controller.handle.bind(controller);
