import { notFound } from '@hapi/boom';
import * as Boom from '@hapi/boom';
import { Context } from 'koa';
import * as compose from 'koa-compose';
import { IMetaData } from '../interfaces';
import * as Joi from '@hapi/joi';

const isProduction = process.env.NODE_ENV === 'production';
/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
const handler = async (ctx: Context, next: () => void) => {
  try {
    await next();
    if (!ctx.state.data) {
      throw notFound('Data not found ' + ctx.request.originalUrl);
    }
  } catch (err) {
    let metaData: IMetaData;
    if (err.isJoi) {
      metaData = handleJoiError(err);
    } else if (err.isBoom) {
      metaData = handleBoomError(err);
    } else {
      metaData = handleDefaultError(err);
    }
    if (err.data) {
      metaData.message = metaData.message + err.data;
    }
    if (!isProduction) {
      metaData.stack = err.stack;
    }
    ctx.status = +metaData.status;
    ctx.body = {
      meta: metaData
    };
    ctx.app.emit('error', err, ctx);
  }
};

const handleBoomError = (err: Boom): IMetaData => {
  return {
    status: +err.output.statusCode,
    message: err.message
  };
};
const handleJoiError = (err: Joi.ValidationError): IMetaData => {
  return {
    status: 400,
    message: err.details[0].message
  };
};

const handleDefaultError = (err: any) => {
  if (err.code && err.code === 'NotAuthorizedException') {
    err.status = 401;
  }

  return {
    status: +err.status || 500,
    message: err.message,
    type: err.code || null
  };
};

const translateError = (error: string) => {
  if (error.indexOf(' ') > -1) {
    error = 'error.' + error.replace(/ /g, '_');
  }
  return error.toLowerCase();
};

export default () => compose([
  handler,
]);
