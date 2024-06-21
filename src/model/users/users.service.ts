import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/mongoose';
import { User as UserInterface } from './interface';
import axios from 'axios';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserService(id: number): Promise<UserInterface> {
    // Check if the user is already in the database
    let user = await this.userModel.findOne({ id }).exec();
    if (user) {
      // Records in the log that the user was retrieved from the database
      this.logger.log(`USER ${id} RETRIEVED FROM DATABASE`);
      return user;
    }

    // If it is not in the database, it gets it from the external API.
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    user = new this.userModel(response.data);
    await user.save();

    // Records in the log that the user was retrieved from the API and saved in the database
    this.logger.log(`USER ${id} FETCHED FROM API AND SAVED TO DATABASE`);
    return user;
  }
}
