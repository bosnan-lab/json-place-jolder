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

  async getUser(id: number): Promise<UserInterface> {
    // Verificar si el usuario ya está en la base de datos
    let user = await this.userModel.findOne({ id }).exec();
    if (user) {
      this.logger.log(`User ${id} retrieved from database`);
      return user;
    }

    // Si no está en la base de datos, obtenerlo de la API externa
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    user = new this.userModel(response.data);
    await user.save();

    this.logger.log(`User ${id} fetched from API and saved to database`);
    return user;
  }
}
