import { methodNotAllowed, notImplemented } from '@hapi/boom';
import * as Router from 'koa-router';
import * as compose from 'koa-compose';

// Import all routes
import bikeRoutes from './bike';
import policeRoutes from './police';
import caseRoutes from './case';

const router = new Router({
  prefix: '/api/v1',
});

const routes = router.routes();
const allowedMethods = router.allowedMethods({
  throw: true,
  methodNotAllowed: () => methodNotAllowed(),
  notImplemented: () => notImplemented(),
});

const routesToExport = [
  routes,
  // allowedMethods,
  bikeRoutes,
  policeRoutes,
  caseRoutes
];

// TODO: is our prod environment "production" or "prod?

export default () => compose(routesToExport);
