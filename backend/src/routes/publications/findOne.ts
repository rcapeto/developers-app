import { FindOnePublicationController } from '@application/controllers/publications/find-one-publication-controller';
import { FindOnePublicationsUsecase } from '@application/usecases/publications/findOne/find-one-publication-usecase';
import { PublicationsPrismaRepository } from '@database/publications/publications-prisma-repository';

const repository = new PublicationsPrismaRepository();
const usecase = new FindOnePublicationsUsecase(repository);
const controller = new FindOnePublicationController(usecase);

export const findOne = controller.handle.bind(controller);
