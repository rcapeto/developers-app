import {
  DeveloperBackend,
  DeveloperFrontend,
} from '@application/model/developer';
import { ErrorMessage } from '@application/model/error';
import { makeDeveloper } from '@test/factory/developer';
import {
  DevelopersRepository,
  GetDevelopersParams,
  GetDevelopersResponse,
  UpdateDeveloperParams,
} from '@application/repositories/developers-repository';
import { RenderDeveloper } from '@application/view/developer';

export class DevelopersInCacheRepository implements DevelopersRepository {
  private developers: DeveloperBackend[] = [];

  constructor() {
    this.populateDatabase();
  }

  async update(
    developerId: string,
    params?: Partial<UpdateDeveloperParams> | undefined,
  ): Promise<DeveloperBackend> {
    const developerIndex = this.developers.findIndex(
      (dev) => dev.id === developerId,
    );

    if (developerIndex < 0) {
      throw new ErrorMessage(`Developer with this ID doesn't exists`, 'error');
    }

    const developer = this.developers[developerIndex];

    if (!developer) {
      throw new ErrorMessage(`Developer with this ID doesn't exists`, 'error');
    }

    developer.avatar_url = params?.avatar_url ?? developer.avatar_url;
    developer.name = params?.name ?? developer.name;
    developer.password = params?.new_password ?? developer.password;
    developer.techs = params?.techs ?? developer.techs;
    developer.username = params?.username ?? developer.username;

    return developer;
  }

  async updateGithub(
    developerId: string,
    github: string,
  ): Promise<DeveloperFrontend> {
    const developer = await this.findOne(developerId);

    if (!developer) {
      throw new ErrorMessage(`Developer with this ID doesn't exists`, 'error');
    }

    developer.github = github;
    return RenderDeveloper.one(developer);
  }

  async findOne(developerId: string): Promise<DeveloperBackend | null> {
    const developer = this.developers.find((dev) => dev.id === developerId);
    return developer ? developer : null;
  }

  async delete(developerId: string): Promise<void> {
    const index = this.developers.findIndex((dev) => dev.id === developerId);
    const hasIndex = index >= 0;

    if (!hasIndex) {
      throw new ErrorMessage(`Developer with this ID doesn't exists`, 'error');
    }

    this.developers.splice(index, 1);
  }

  async all(params?: GetDevelopersParams): Promise<GetDevelopersResponse> {
    const perPage = params?.perPage ?? 10;
    const page = params?.page ?? 1;

    const start = (page - 1) * perPage;
    const end = perPage * page;

    const developers = this.developers.slice(start, end);

    return {
      developers: RenderDeveloper.many(developers),
      perPage,
      page,
      totalPages: Math.ceil(this.developers.length / perPage),
      count: this.developers.length,
    };
  }

  populateDatabase() {
    for (let i = 1; i <= 20; i++) {
      const developer = makeDeveloper({
        username: `john doe - ${i}`,
        id: i.toString().padStart(4, '0'),
      });

      this.developers.push(developer);
    }
  }
}
