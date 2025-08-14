import {Schema, Types} from "mongoose";
import {REF} from "../../utils/constants/refs";

export interface IEvent {
  user: Types.ObjectId,
  title: string,
  date: Date,
  description?: string
}

const EventSchema: Schema = new Schema<IEvent>(
  {
    user: {type: Schema.Types.ObjectId, ref: REF.USER, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, default: null}
  },
  {
    timestamps: true,
    versionKey: false
  }
)