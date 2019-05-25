import { Context } from 'koa';
import * as police from '../services/police';
import {
    IUser
} from '../interfaces';

export const addPoliceOfficer = async (ctx: Context, next: () => void) => {
    const payload: IUser = {
        fullName: ctx.request.body.fullName
    };
    ctx.state.data = await police.addPolice(payload);
    await next();
};

export const removePoliceOfficer = async (ctx: Context, next: () => void) => {
    ctx.state.data = await police.removePolice(+ctx.params.id);
    await next();
};
