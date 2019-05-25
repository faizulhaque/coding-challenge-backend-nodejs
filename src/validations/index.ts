import { SchemaLike, validate as joiValidate, LanguageRootOptions } from '@hapi/joi';

const language: LanguageRootOptions = {
  root: 'value',
  key: 'error.joi.{{label}}_',
  any: {
    required: 'is_required'
  },
  date: {
    base: 'must_be_valid_date'
  }
};

export const validate = <T>(payload: T, schema: SchemaLike): T => {
  const { error, value } = joiValidate(payload, schema);
  if (error) {
    throw error;
  }
  return value;
};
