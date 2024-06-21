import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Creates an instance of the NestJS application
  const app = await NestFactory.create(AppModule);

  // Create a logger with the name 'Bootstrap'.
  // Logger
  const logger = new Logger('Bootstrap');

  // Sets a global prefix for all API routes
  // Set Global Prefix
  app.setGlobalPrefix('api');

  // Global Pipes Configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Allows only properties defined in the DTOs
      forbidNonWhitelisted: true, // Rejects requests containing properties not defined in the DTOs
      transform: true, // Automatically transforms incoming requests to class instances
    }),
  );

  // Config Service
  // Gets the configuration service for accessing the environment variables
  const configService = app.get(ConfigService);
  const port = configService.get('PORT'); // Gets the server's listening port from the environment variables

  // Starts the NestJS server on the specified port
  await app.listen(Number(port));
  // Records in the log that the server is running on the specified port
  logger.log(`Server is running on Port: ${port}`);
}
bootstrap(); // Calls the startup function to start the application
