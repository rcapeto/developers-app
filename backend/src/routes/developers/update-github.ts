import { DeveloperUpdateGithubController } from '@application/controllers/developers/developer-update-github-controller';
import { DeveloperUpdateGithubUsecase } from '@application/usecases/developers/update-github/developer-update-github-usecase';
import { DevelopersPrismaRepository } from '@database/developers/developers-prisma-repository';

const repository = new DevelopersPrismaRepository();
const usecase = new DeveloperUpdateGithubUsecase(repository);
const controller = new DeveloperUpdateGithubController(usecase);

export const updateGithub = controller.handle.bind(controller);
