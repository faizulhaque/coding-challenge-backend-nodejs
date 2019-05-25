import * as Joi from '@hapi/joi';

export const addPolice: Joi.SchemaMap = {
    fullName: Joi.string().required()
};

export const removePolice: Joi.SchemaMap = {
    id: Joi.number().required()
};
