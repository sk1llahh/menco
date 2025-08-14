import { model, Schema, Types } from 'mongoose';

import { REF } from '../../utils/constants/refs';

export interface IRecommendation {
  from: Types.ObjectId;
  to: Types.ObjectId;
  message: string;
}

const RecommendationSchema: Schema = new Schema<IRecommendation>(
  {
    from: { type: Schema.Types.ObjectId, ref: REF.USER, required: true },
    to: { type: Schema.Types.ObjectId, ref: REF.USER, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model<IRecommendation>(REF.RECOMMENDATION, RecommendationSchema);
