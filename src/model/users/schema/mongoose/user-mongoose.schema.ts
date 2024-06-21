import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ _id: false })
class Geo {
  @Prop()
  lat: string;

  @Prop()
  lng: string;
}

const GeoSchema = SchemaFactory.createForClass(Geo);

@Schema({ _id: false })
class Address {
  @Prop()
  street: string;

  @Prop()
  suite: string;

  @Prop()
  city: string;

  @Prop()
  zipcode: string;

  @Prop({ type: GeoSchema })
  geo: Geo;
}

const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ _id: false })
class Company {
  @Prop()
  name: string;

  @Prop()
  catchPhrase: string;

  @Prop()
  bs: string;
}

const CompanySchema = SchemaFactory.createForClass(Company);

@Schema()
export class User {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop()
  phone: string;

  @Prop()
  website: string;

  @Prop({ type: CompanySchema })
  company: Company;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Ajuste para eliminar _id y __v al convertir a JSON
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    if (ret.address && ret.address.geo) {
      delete ret.address.geo._id;
    }
    if (ret.address) {
      delete ret.address._id;
    }
    if (ret.company) {
      delete ret.company._id;
    }
    return ret;
  },
});
