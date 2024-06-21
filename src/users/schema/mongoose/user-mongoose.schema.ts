import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  address: {
    street: string;
    suite: string;
    city: string;
    zipCode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };

  @Prop()
  phone: string;

  @Prop()
  website: string;

  @Prop()
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
