import { Context } from 'koa';
import * as caseService from '../services/case';

export const resolveCase = async (ctx: Context, next: () => void) => {
    ctx.state.data = await caseService.resolveCase(+ctx.params.id);
    await next();
};
