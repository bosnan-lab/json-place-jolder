import { configLoader } from './config-loader';
import { envsSchema } from './envs-schema';

export const configOptions = {
  load: [configLoader], // Load the configuration using the loader defined in config-loader.ts
  validationSchema: envsSchema, // Uses the validation scheme defined in envs-schema.ts
};
