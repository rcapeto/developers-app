import { ErrorMessage } from '@app/views/error';
import { secret_key } from '@config/keys';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Status } from 'src/common/enums';
import { logger } from 'src/common/logger';

export const ensureAuthenticateClient = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  console.log({ headers: request.headers });

  if (!authHeader) {
    const message = 'Token is missing';

    logger('error', message);

    return response.status(Status.BAD_REQUEST).json({
      data: new ErrorMessage(message, 'validation'),
    });
  }

  const [_, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, secret_key);
    const userId = sub as string;

    request.user_id = userId;

    return next();
  } catch (err) {
    const message = 'Invalid header token';

    logger('error', message);

    return response.status(Status.UNAUTHORIZED).json({
      data: new ErrorMessage(message, 'validation'),
    });
  }
};
