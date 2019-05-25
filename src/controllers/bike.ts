import { Context } from 'koa';
import * as bike from '../services/bike';
import {
    IReportBike, ISearchBike
} from '../interfaces';

export const report = async (ctx: Context, next: () => void) => {
    const payload: IReportBike = {
        fullName: ctx.request.body.fullName,
        licenseNumber: ctx.request.body.licenseNumber,
        color: ctx.request.body.color,
        type: ctx.request.body.type,
        date: ctx.request.body.date,
        description: ctx.request.body.description
    };
    ctx.state.data = await bike.report(payload);
    await next();
};

export const searchBike = async (ctx: Context, next: () => void) => {
    const payload: ISearchBike = {
        fullName: ctx.query.fullName,
        licenseNumber: ctx.query.licenseNumber,
        color: ctx.query.color,
        type: ctx.query.type,
        date: ctx.query.date,
        description: ctx.query.description,
        isResolved: ctx.query.isResolved
    };
    const result = await bike.search(payload, ctx.state.pagination);
    ctx.state.data = result.rows;
    ctx.state.pagination.totalCount = result.count;
    await next();
};
