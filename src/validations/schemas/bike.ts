import * as Joi from '@hapi/joi';

export const bikeReport: Joi.SchemaMap = {
    fullName: Joi.string().required(),
    licenseNumber: Joi.string().required(),
    date: Joi.date().required(),
    description: Joi.string().required(),
    color: Joi.string().required(),
    type: Joi.string().required()
};
