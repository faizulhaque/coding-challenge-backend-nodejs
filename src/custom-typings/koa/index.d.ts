import * as Logger from 'bunyan';
import { ILanguageInstance } from '../../../src/interfaces/models/language';
import { Context } from 'koa';
import { ICognitoUser } from '../../interfaces/index';
import { IResponse } from '../../../src/interfaces';
import { IRoleInstance } from '../../../src/interfaces/models/role';
import { IPagination } from '../../../src/interfaces/pagination';

declare module 'koa' {

  interface Context {
    reqId?: string;
    responseTime?: number;
    log: Logger;
    body: IResponse;
    state: IState | any;
    request: Request;
    mailer: any;
    userAgent: any;
  }

  interface Request {
    auth?: any;
  }
  interface IState {
    cognitoUser?: ICognitoUser;
    pagination?: IPagination;
    data?: any;
    message?: string;
    role?: IRoleInstance;
    language?: ILanguageInstance;
    [other: string]: any;
    unreadCount?: number;
  }
}
