import {model, Schema, Types} from "mongoose";
import {REF} from "../../utils/constants/refs";

export interface IAchievement {
  user: Types.ObjectId,
  title: string,
  description: string
}

const AchievementSchema:Schema = new Schema<IAchievement>(
  {
    user: {type: Schema.Types.ObjectId, ref: REF.USER, required: true},
    title: {type: String, required: true},
    description: {type: String, default: null}
  }
)

export default model<IAchievement>(REF.ACHIEVEMENT, AchievementSchema)