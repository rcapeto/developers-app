type Config = {
  isMobile?: boolean;
  path: string;
};

const PORT = process.env.SERVER_PORT ?? 3333;

export function getUrlEnvironment(config: Config): string {
  const isMobile = config?.isMobile ?? false;
  const mobilePath = `http://192.168.0.109:${PORT}/uploads/${config.path}`;
  const webPath = `http://localhost:${PORT}/uploads/${config.path}`;

  return isMobile ? mobilePath : webPath;
}
