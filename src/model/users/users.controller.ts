import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/mongoose';

// Defines the driver to handle requests related to users under the path /users
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Handles GET requests to /users/:id where :id is a dynamic parameter
  @Get(':id')
  async getUserController(@Param('id') id: number): Promise<User> {
    return this.userService.getUserService(id); // Call the service to get a user by its id
  }
}
