import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUser(id);
  }
}
