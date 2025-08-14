import { Schema, model, Types } from 'mongoose';

import { REF } from '../../utils/constants/refs';

const STATUSES = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
} as const;

const ROLES = {
  mentor: 'mentor',
  student: 'student',
} as const;

type Status = (typeof STATUSES)[keyof typeof STATUSES];
type Roles = (typeof ROLES)[keyof typeof ROLES];

export interface IApplication {
  mentor: Types.ObjectId;
  student: Types.ObjectId;
  status: Status;
  role: Roles;
  message?: string;
}

const ApplicationSchema: Schema = new Schema<IApplication>(
  {
    mentor: { types: Types.ObjectId, ref: REF.USER, required: true },
    student: { types: Types.ObjectId, ref: REF.USER, required: true },
    status: {
      type: String,
      enum: Object.values(STATUSES),
      default: STATUSES.pending,
    },
    role: { type: String, enum: Object.values(ROLES), required: true },
    message: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model<IApplication>(REF.APPLICATION, ApplicationSchema);
