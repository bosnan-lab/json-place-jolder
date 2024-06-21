import * as Joi from 'joi';

import 'dotenv/config'; // Import environment variable settings from .env

// Defines a scheme for validating environment variables and assigns them to envsSchema
export const envsSchema = Joi.object({
  PORT: Joi.string().required(), // Validates that PORT is a required string
  DATABASE_URL: Joi.string().required(), // Validates that DATABASE_URL is a required string
}).unknown(true); // Allows additional variables not specified in the schematic
