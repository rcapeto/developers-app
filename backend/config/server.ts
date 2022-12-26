export const serverConfig = {
  port: process.env.SERVER_PORT ?? 3333,
  token: {
    secret_key:
      process.env.TOKEN_SECRET_KEY ?? 'b9169daf3082ad21e27b1668d51c2d56',
  },
  uploads: {
    developers: process.env.UPLOAD_PATH_DEVELOPER ?? 'uploads_developers',
    publications: process.env.UPLOAD_PATH_PUBLICATION ?? 'uploads_publications',
  },
  routes: {
    account: {
      register: '/account/register',
      login: '/account/login',
    },
    developers: {
      all: '/developers',
      delete: '/developer/me/delete',
      findOne: '/developers/:id',
      updateGithub: '/developer/me/github',
      me: '/developer/me',
      update: '/developer/me/update',
    },
    publications: {
      all: '/publications',
      allDeveloperPublications: '/publications/developer/:id',
    },
  },
};
