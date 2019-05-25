import { Context } from 'koa';
import * as compose from 'koa-compose';

const request = async (ctx: Context, next: () => void) => {
  ctx.log.info(`Request from ${ctx.request.ip} to ${ctx.path}`);
  await next();
};

export default () => compose([
  request
]);
