import { Request, Response } from 'express';

export abstract class BaseController {
  abstract handle(request: Request, response: Response);
}
