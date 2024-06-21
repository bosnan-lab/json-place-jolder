import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// Schema definitions for Mongoose
@Schema({ _id: false, strict: true })
class Geo {
  @Prop()
  lat: string;

  @Prop()
  lng: string;
}

const GeoSchema = SchemaFactory.createForClass(Geo);

@Schema({ _id: false, strict: true })
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

@Schema({ _id: false, strict: true })
class Company {
  @Prop()
  name: string;

  @Prop()
  catchPhrase: string;

  @Prop()
  bs: string;
}

const CompanySchema = SchemaFactory.createForClass(Company);

@Schema({ strict: true })
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

// Setting to remove _id and __v when converting to JSON
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id; // Remove _id field when serializing to JSON
    delete ret.__v; // Remove __v field when serializing to JSON
    if (ret.address && ret.address.geo) {
      delete ret.address.geo._id; // Removes _id nested inside address.geo when serializing to JSON
    }
    if (ret.address) {
      delete ret.address._id; // Remove _id nested inside address when serializing to JSON
    }
    if (ret.company) {
      delete ret.company._id; // Remove _id nested inside company when serializing to JSON
    }
    return ret;
  },
});
