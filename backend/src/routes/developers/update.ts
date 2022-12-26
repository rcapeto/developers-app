import { DeveloperUpdateController } from '@application/controllers/developers/developer-update-controller';
import { UpdateDeveloperUsecase } from '@application/usecases/developers/update/developer-update-usecase';
import { DevelopersPrismaRepository } from '@database/developers/developers-prisma-repository';

const repository = new DevelopersPrismaRepository();
const usecase = new UpdateDeveloperUsecase(repository);
const controller = new DeveloperUpdateController(usecase);

export const update = controller.handle.bind(controller);
