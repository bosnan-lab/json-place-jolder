import * as Joi from 'joi';

import 'dotenv/config'; // IMPORT FROM .ENV

// VALIDATE ENVIRONMENT VARIABLES AND ASSIGN THEM TO envsSchema
export const envsSchema = Joi.object({
  PORT: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
}).unknown(true); // allow additional variables
