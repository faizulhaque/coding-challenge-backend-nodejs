import { Context } from 'koa';
import * as compose from 'koa-compose';
import {
    LIMIT,
    OFFSET,
    SORT_BY,
    ASC_ORDER
} from '../constants';
import { validate } from '@hapi/joi';
import * as joiSchema from '../validations/schemas';

const paginationMiddleware = async (ctx: Context, next: () => void) => {
    if (ctx.method === 'GET') {
        ctx.state.pagination = {
            limit: +ctx.query.limit || LIMIT,
            offset: +ctx.query.offset || OFFSET,
            sortBy: ctx.query.sortBy || SORT_BY,
            sortOrder: ctx.query.sortOrder || ASC_ORDER
        };
        validate(ctx.state.pagination, joiSchema.pagination);
        if (ctx.state.pagination.limit < 0) {
            ctx.state.pagination.limit = LIMIT;
        }
        if (ctx.state.pagination.offset < 0) {
            ctx.state.pagination.offset = OFFSET;
        }
    }
    await next();
};

export default () => compose([
    paginationMiddleware
]);
