import { PublicationsAllController } from '@application/controllers/publications/publications-all-controller';
import { AllPublicationsUsecase } from '@application/usecases/publications/all/all-publications-usecase';
import { PublicationsPrismaRepository } from '@database/publications/publications-prisma-repository';

const repository = new PublicationsPrismaRepository();
const usecase = new AllPublicationsUsecase(repository);
const controller = new PublicationsAllController(usecase);

export const getAll = controller.handle.bind(controller);
