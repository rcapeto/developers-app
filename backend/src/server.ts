import express from 'express';
import cors from 'cors';
import path from 'path';

import routes from '@app/routes';

const app = express();
const PORT = process.env.SERVER_PORT ?? 3333;

app.use(cors());
app.use(express.json());
app.use(
  '/uploads_users',
  express.static(path.join(__dirname, '..', 'uploads')),
);

for (const route of routes) {
  app.use(route);
}

app.listen(PORT, listener(PORT));

function listener(port: string | number) {
  return () => {
    console.log(`Server is running at http://localhost:${port}`);
  };
}
