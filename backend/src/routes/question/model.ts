import {model, Schema, Types} from "mongoose";
import {REF} from "../../utils/constants/refs";

export interface IQuestion {
  text: string,
  askedTo: Types.ObjectId,
  askedBy?: Types.ObjectId
}

const QuestionSchema: Schema = new Schema<IQuestion>(
  {
    text: {type: String, required: true},
    askedTo: {type: Schema.Types.ObjectId, ref: REF.USER, required: true},
    askedBy: {type: Schema.Types.ObjectId, ref: REF.USER, default: null}
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model<IQuestion>(REF.QUESTION, QuestionSchema)