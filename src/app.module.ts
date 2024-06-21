import { Module } from '@nestjs/common';
import { UsersModule } from './model/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configLoader, envsSchema } from './config';

@Module({
  imports: [
    UsersModule, // Imports the UsersModule module that handles the user logic
    ConfigModule.forRoot({
      load: [configLoader], // Load the configuration using the loader defined in config.ts
      validationSchema: envsSchema, // Uses the validation scheme defined in envs-schema.ts
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import the configuration module to access the environment variables
      useFactory: (configService: ConfigService) => {
        // Gets the configuration of the MongoDB database
        const mongoConfig = configService.get('mongo_database');
        return {
          uri: mongoConfig.uri, // Configures the MongoDB connection URI obtained from the environment variables
        };
      },
      inject: [ConfigService], // Injects the configuration service to access the environment variables
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} // Defines the main module of the application
