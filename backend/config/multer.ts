import multer from 'multer';
import path from 'path';

const users = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', 'uploads_users'),
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
};

export const multerConfig = {
  users,
};
