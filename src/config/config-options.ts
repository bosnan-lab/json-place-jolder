import { configLoader } from './config-loader';
import { envsSchema } from './envs-schema';

export const configOptions = {
  load: [configLoader],
  validationSchema: envsSchema,
};
