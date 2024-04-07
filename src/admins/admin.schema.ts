import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';


export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, default: 'admin' })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.pre<AdminDocument>('save', async function (next) {
  const admin = this;
  if (!admin.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(admin.password, salt);
  admin.password = hashedPassword;
  next();
});