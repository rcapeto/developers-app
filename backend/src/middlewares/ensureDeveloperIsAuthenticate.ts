import { ErrorMessage } from '@application/model/error';
import { Status } from '@common/enums';
import { Token } from '@utils/token';
import { Request, Response, NextFunction } from 'express';

export function ensureDeveloperIsAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const header = request.headers;

  const hasAuthorizationHeader = header.authorization;

  if (!hasAuthorizationHeader) {
    return response.status(Status.UNAUTHORIZED).json({
      data: new ErrorMessage(
        'Please sign in to use this route.',
        'unauthorized',
      ),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, token] = header.authorization?.split(' ') as string[];

  if (!token) {
    return response.status(Status.UNAUTHORIZED).json({
      data: new ErrorMessage(
        'Please sign in to use this route.',
        'unauthorized',
      ),
    });
  }

  try {
    const developerId = Token.verify(token) as string;

    request.developer_id = developerId;

    return next();
  } catch (err) {
    request.developer_id = '';

    return response.status(Status.UNAUTHORIZED).json({
      data: new ErrorMessage('Invalid token', 'unauthorized'),
    });
  }
}
