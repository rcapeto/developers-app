import { CreatePublicationController } from '@application/controllers/publications/create-publication-controller';
import { CreatePublicationsUsecase } from '@application/usecases/publications/create/create-publication-usecase';
import { PublicationsPrismaRepository } from '@database/publications/publications-prisma-repository';

const repository = new PublicationsPrismaRepository();
const usecase = new CreatePublicationsUsecase(repository);
const controller = new CreatePublicationController(usecase);

export const create = controller.handle.bind(controller);
