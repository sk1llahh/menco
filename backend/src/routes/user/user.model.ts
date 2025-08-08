import {
    Schema,
    model, Document
} from 'mongoose';
import { REF } from '../../utils/constants/refs.js';

interface ISchema extends Document {
    login: String
}

const UserSchema: Schema = new Schema<ISchema>({
    login: {
        type: String,
        required: true
    }
});

export default model(REF.USER, UserSchema);
