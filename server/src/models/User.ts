import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  name?: string;
  currency: 'USD' | 'INR';
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  currency: {
    type: String,
    enum: ['USD', 'INR'],
    default: 'INR',
  },
}, {
  timestamps: false,
  collection: 'users',
});

export const User = model<IUser>('User', userSchema);

