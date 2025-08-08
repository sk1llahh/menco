import {
  Schema,
  model, Document
} from 'mongoose';
import {REF} from '../../utils/constants/refs.js';

export interface IUser{
  login: string,
  password: string,
}

const AuthSchema: Schema = new Schema<IUser>({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default model<IUser>(REF.USER, AuthSchema);
