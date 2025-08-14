import { model, Schema, Types } from 'mongoose';

import { REF } from '../../utils/constants/refs';

export interface IReview {
  reviewer: Types.ObjectId;
  reviewedUser: Types.ObjectId;
  rating: number;
  comment: string;
}

const ReviewSchema: Schema = new Schema<IReview>(
  {
    reviewer: { type: Schema.Types.ObjectId, ref: REF.USER, required: true },
    reviewedUser: {
      type: Schema.Types.ObjectId,
      ref: REF.USER,
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model<IReview>(REF.REVIEW, ReviewSchema);
