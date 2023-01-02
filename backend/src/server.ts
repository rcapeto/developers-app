import express from 'express';
import cors from 'cors';
import path from 'path';

import { serverConfig } from '@config/server';
import { routes } from '@routes/index';

const app = express();
const PORT = serverConfig.port;

app.use(cors());
app.use(express.json());

for (const route of routes) {
  app.use(route);
}

app.use(
  '/uploads_developers',
  express.static(path.join(__dirname, '..', 'uploads_developers')),
);

console.log(serverConfig.uploads.developers);
app.use(
  `/${serverConfig.uploads.publications}`,
  express.static(path.join(__dirname, '..', serverConfig.uploads.publications)),
);

app.listen(PORT, listener(PORT));

function listener(port: string | number) {
  return () => {
    console.log(`Server is running at http://localhost:${port}`);
  };
}
