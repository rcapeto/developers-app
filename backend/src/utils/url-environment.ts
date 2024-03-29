type Config = {
  isMobile?: boolean;
  path: string;
  uploadFolder?: 'uploads_developers' | 'uploads_publications';
};

const PORT = process.env.SERVER_PORT ?? 3333;

export function getUrlEnvironment(config: Config): string {
  const isMobile = config?.isMobile ?? false;
  const folder = config?.uploadFolder ?? 'uploads_developers';

  if (!config.path) {
    return '';
  }

  const mobilePath = `http://192.168.0.109:${PORT}/${folder}/${config.path}`;
  const webPath = `http://localhost:${PORT}/${folder}/${config.path}`;

  return isMobile ? mobilePath : webPath;
}
