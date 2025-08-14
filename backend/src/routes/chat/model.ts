import {Schema, model, Document, Types} from 'mongoose';
import {REF} from "../../utils/constants/refs";

export interface IChat extends Document {
  participants: Types.ObjectId[]
}

export interface IMessage extends Document {
  chat: Types.ObjectId,
  sender: Types.ObjectId,
  text: string
}

const ChatSchema: Schema = new Schema<IChat>(
  {
    participants: [{types: Types.ObjectId, ref: REF.USER, required: true}],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MessageSchema: Schema = new Schema<IMessage>(
  {
    chat: {type: Schema.Types.ObjectId, ref: REF.CHAT, required: true},
    sender: {type: Schema.Types.ObjectId, ref: REF.USER, required: true},
    text: {type: String, required: true},
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const ChatModel =  model<IChat>(REF.CHAT, ChatSchema)
const MessageModel = model<IMessage>(REF.MESSAGE, MessageSchema)

export default {
  ChatModel,
  MessageModel
}