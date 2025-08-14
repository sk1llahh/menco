import { model, Schema, Types } from 'mongoose';

import { REF } from '../../utils/constants/refs';

export interface IProgressTracker {
  user: Types.ObjectId;
  goals: { title: string; completed: boolean }[];
}

const ProgressTrackerSchema: Schema = new Schema<IProgressTracker>(
  {
    user: { type: Schema.Types.ObjectId, ref: REF.USER, required: true },
    goals: [
      {
        title: { type: String, required: true },
        completed: { types: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model<IProgressTracker>(
  REF.PROGRESS_TRACKER,
  ProgressTrackerSchema,
);
