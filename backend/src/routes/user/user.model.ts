import {
    Schema,
    model, Document
} from 'mongoose';
import { REF } from '../../utils/constants/refs.js';

interface ISchema extends Document {
    telegramId: Number
    username: String
    date: Date
}

const UserSchema: Schema = new Schema<ISchema>({
    telegramId: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default model(REF.USER, UserSchema);
