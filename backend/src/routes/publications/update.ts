import { UpdatePublicationController } from '@application/controllers/publications/update-publication-controller';
import { UpdatePublicationsUsecase } from '@application/usecases/publications/update/update-publication-usecase';
import { PublicationsPrismaRepository } from '@database/publications/publications-prisma-repository';

const repository = new PublicationsPrismaRepository();
const usecase = new UpdatePublicationsUsecase(repository);
const controller = new UpdatePublicationController(usecase);

export const updatePublication = controller.handle.bind(controller);
