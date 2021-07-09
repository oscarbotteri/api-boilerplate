import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { HttpError } from 'routing-controllers/http-error/HttpError';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import * as config from 'config';
import { LoggerService } from '../services';
import { HttpStatus, MiddlewareType } from '../enums';

@Middleware({ type: MiddlewareType.AFTER })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  constructor(private readonly logger: LoggerService) {}

  error(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HttpError) {
      res.status(err.httpCode).send(err);

      return next();
    }

    this.logger.error('Something went wrong', {
      err,
      data: {
        payload: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers,
      },
    });

    if (config.APP_ENV === 'local') {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
        name: 'InternalServerError',
        message: err.toString(),
      });

      return next();
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
      name: 'InternalServerError',
      message: 'Internal server error',
    });

    return next();
  }
}
