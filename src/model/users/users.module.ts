import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schema/mongoose';

@Module({
  imports: [
    // Import the user schema for use in Mongoose
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService], // Defines service providers including UsersService
  controllers: [UsersController], // Define controllers including UsersController
})
export class UsersModule {}
