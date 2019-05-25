import { Context } from 'koa';
import * as compose from 'koa-compose';
import { IResponse } from '../interfaces/index';

const handler = async (ctx: Context, next: () => void) => {
  ctx.body = {} as IResponse;
  ctx.body = {
    meta: {
      status: ctx.status,
      message: ctx.state.message || 'success'
    },
    data: ctx.state.data
  };
  if (ctx.state.pagination) {
    ctx.body.meta.limit = ctx.state.pagination.limit;
    ctx.body.meta.offset = ctx.state.pagination.offset;
    ctx.body.meta.totalCount = ctx.state.pagination.totalCount;
  }
  if (ctx.state.pagination) {
    ctx.body.meta.unreadCount = ctx.state.unreadCount;
  }
  await next();
};

export default () => compose([
  handler,
]);
