import * as Joi from '@hapi/joi';
import { MAX_LIMIT } from '../../constants/index';

export const pagination: Joi.SchemaMap = {
    limit: Joi.number().max(MAX_LIMIT).required(),
    offset: Joi.number().required(),
    sortBy: Joi.string().required(),
    sortOrder: Joi.string().required()
};
