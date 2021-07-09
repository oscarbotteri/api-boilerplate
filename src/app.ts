import 'reflect-metadata';
import Axios from 'axios';
import { Server } from 'http';
import { useContainer, useExpressServer } from 'routing-controllers';
import { ConnectionManager, createConnection, useContainer as typeOrmContainer } from 'typeorm';
import express from 'express';
import * as config from 'config';
import { Container } from 'typedi';
import compression from 'compression';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { AXIOS_INSTANCE_TOKEN, LoggerService } from './common/services';
import { ErrorMiddleware, RequestMiddleware } from './common/middlewares';

async function bootstrap(): Promise<void> {
  try {
    useContainer(Container);
    typeOrmContainer(Container);

    const logger: LoggerService = Container.get(LoggerService);

    await createConnection({
      type: config.DB_TYPE,
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASS,
      database: config.DB_NAME,
      logging: config.DB_LOGS,
      synchronize: config.DB_SYNC,
      entities: [`${__dirname}/modules/**/*.entity.ts`],
      extra: {
        connectionLimit: config.DB_POOL,
      },
    });

    const app = express();

    // Middleware to compress responses
    app.use(compression());

    // Middleware to set basic security features
    app.use(helmet());

    // Setups express
    useExpressServer(app, {
      cors: true,
      validation: true,
      classTransformer: true,
      defaultErrorHandler: false,
      controllers: [`${__dirname}/modules/**/*.controller.ts`],
      middlewares: [ErrorMiddleware, RequestMiddleware],
    });

    // Creates new apollo instance
    const apolloServer = new ApolloServer({
      playground: config.APOLLO_PLAYGROUND === 'true',
      schema: await buildSchema({
        container: Container,
        resolvers: [`${__dirname}/modules/**/*.resolver.{ts,js}`],
      }),
      context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, path: '/graphql' });

    const server: Server = app.listen(Number(config.HTTP_PORT));

    Container.set(AXIOS_INSTANCE_TOKEN, Axios);
    Container.set(Server, server);

    logger.info(`App listening at port ${config.HTTP_PORT}`);
  } catch (err) {
    console.error('Error bootstrapping application', err);
    process.exit(1);
  }
}

function shutDown() {
  try {
    const logger: LoggerService = Container.get(LoggerService);
    const manager: ConnectionManager = Container.get(ConnectionManager);
    const server: Server = Container.get(Server);

    logger.info('Received kill signal, shutting down gracefully');

    if (server) {
      server.close(async () => {
        logger.debug('Server connections closed');

        if (manager) {
          await manager.get().close();
          logger.debug('Database connections closed');
        }

        logger.info('Closed out remaining connections');

        process.exit(0);
      });
    }
  } catch (err) {
    console.error('Could not close connections, forcefully shutting down', err);
    process.exit(1);
  }

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

bootstrap();

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
