import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import * as config from 'config';
import { LoggerService } from '../services';
import { MiddlewareType } from '../enums';

@Middleware({ type: MiddlewareType.BEFORE })
export class RequestMiddleware implements ExpressMiddlewareInterface {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const message = `===> [${ip}] [${req.method}] ${req.originalUrl}`;

    if (req.method === 'GET') {
      this.logger.debug(message);
    } else {
      this.logger.debug(message, {
        payload: req.body,
      });
    }

    res.on('finish', () => {
      const endAt = process.hrtime(startAt);
      const elapsedTime = endAt[0] * 1e3 + endAt[1] * 1e-6;
      const message = `<=== [${ip}] [${req.method}] ${req.originalUrl}`;

      if (elapsedTime > Number(config.ACCEPTABLE_RESPONSE_TIME)) {
        this.logger.warn(`${message} - slow response`);
      } else {
        this.logger.debug(message);
      }
    });

    next();
  }
}
