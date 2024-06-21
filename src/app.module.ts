import { Module } from '@nestjs/common';
import { UsersModule } from './model/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configLoader, envsSchema } from './config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: envsSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mongoConfig = configService.get('mongo_database');
        return {
          uri: mongoConfig.uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
