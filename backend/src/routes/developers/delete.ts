import { DeveloperDeleteController } from '@application/controllers/developers/developer-delete-controller';
import { DeleteDeveloperUsecase } from '@application/usecases/developers/delete/delete-developer-usecase';
import { DevelopersPrismaRepository } from '@database/developers/developers-prisma-repository';

const repository = new DevelopersPrismaRepository();
const usecase = new DeleteDeveloperUsecase(repository);
const controller = new DeveloperDeleteController(usecase);

export const deleteDeveloper = controller.handle.bind(controller);
