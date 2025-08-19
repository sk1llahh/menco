import { z } from 'zod';

import { USER_FORM_NAME } from '@/entities/user/model/const';

export const UserSchema = z.object({
  [USER_FORM_NAME.login]: z.string(),
  [USER_FORM_NAME.password]: z.string(),
});

export type IUser = z.infer<typeof UserSchema>;
