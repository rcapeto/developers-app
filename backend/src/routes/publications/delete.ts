import { DeletePublicationController } from '@application/controllers/publications/delete-publication-controller';
import { DeletePublicationsUsecase } from '@application/usecases/publications/delete/delete-publication-usecase';
import { PublicationsPrismaRepository } from '@database/publications/publications-prisma-repository';

const repository = new PublicationsPrismaRepository();
const usecase = new DeletePublicationsUsecase(repository);
const controller = new DeletePublicationController(usecase);

export const deletePublication = controller.handle.bind(controller);
