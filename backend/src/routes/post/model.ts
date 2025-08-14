import {model, Schema, Types} from "mongoose";
import {REF} from "../../utils/constants/refs";

export interface IPost {
  author: Types.ObjectId,
  content: string,
  attachments: string[]
}

const PostSchema: Schema = new Schema<IPost>(
  {
    author: {type: Schema.Types.ObjectId, ref: REF.USER, required: true},
    content: {type: String, required: true},
    attachments: {type: [String], default: []}
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model<IPost>(REF.POST, PostSchema)