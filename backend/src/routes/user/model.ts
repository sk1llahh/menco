import { Schema, model } from 'mongoose';

import { REF } from '../../utils/constants/refs';

export interface IUser {
  login: string;
  password: string;

  email?: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  languages?: string[];
  socialLinks?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {
      type: String,
      sparse: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
      default: null,
    },
    avatar: { type: String, default: null },
    bio: { type: String, default: null },
    skills: { type: [String], default: [] },
    experience: { type: String, default: null },
    languages: { type: [String], default: [] },
    socialLinks: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model<IUser>(REF.USER, UserSchema);
