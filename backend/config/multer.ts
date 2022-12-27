import multer from 'multer';
import path from 'path';
import { serverConfig } from './server';

const developers = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', serverConfig.uploads.developers),
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
};

const publications = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', serverConfig.uploads.publications),
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
};

export const multerConfig = {
  developers,
  publications,
};
