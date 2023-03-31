import { AllDeveloperPublicationsController } from '@application/controllers/publications/all-developer-publications-controller';
import { AllDeveloperPublicationsUsecase } from '@application/usecases/publications/developer-publications/developer-publications-usecase';
import { PublicationsPrismaRepository } from '@database/publications/publications-prisma-repository';

const repository = new PublicationsPrismaRepository();
const usecase = new AllDeveloperPublicationsUsecase(repository);
const controller = new AllDeveloperPublicationsController(usecase);

export const getAllDeveloperPublications = controller.handle.bind(controller);
