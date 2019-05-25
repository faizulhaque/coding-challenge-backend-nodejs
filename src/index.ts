import * as Koa from 'koa';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import * as koaBody from 'koa-body';
import * as helmet from 'koa-helmet';
import * as jsonMiddleware from 'koa-json';
import * as userAgent from 'koa-useragent';
import errorMiddleware from './middlewares/error';
import responseMiddleware from './middlewares/response';
import logMiddleware from './middlewares/log';
import routeMiddleware from './routes/index';
import paginationMiddleware from './middlewares/pagination';
import { logger, bootstrap } from './bootstrap/';

// TODO: need to find a better way, since top level await is not allowed
bootstrap()
  .then(() => {
    const app = new Koa();
    // Serve api docs
    // todo: qa env file
    if (process.env.NODE_ENV !== 'production') {
      app.use(mount('/api/docs', serve('doc')));
    }
    app.use(koaBody({ jsonLimit: '50mb', formLimit: '50mb', multipart: true, json: true }));
    app.use(helmet({ noCache: true }));
    // Register middleware
    app.use(userAgent);
    app.use(logMiddleware(logger));
    app.use(errorMiddleware());
    app.use(jsonMiddleware());
    app.use(paginationMiddleware());
    // Registers routes via middleware

    app.use(routeMiddleware());
    app.use(responseMiddleware());
    app.listen(process.env.API_PORT || 4000, () => {
      logger.info(`current environment: ${process.env.NODE_ENV}`);
      logger.info(`server started at port: ${process.env.API_PORT}`);
    });
    // centeralized error logging as per KOA docs
    app.on('error', (error, ctx) => {
      ctx.log.error(error);
    });
  })
  .catch((err: any) => logger.error(err));
