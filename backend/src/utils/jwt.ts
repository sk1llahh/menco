import jwt from 'jsonwebtoken';

import { AccessPayload } from '@/interfaces/token';
import { CONFIG } from '@/utils/config';

export const signAccessToken = (payload: AccessPayload) => {
  return jwt.sign(payload, CONFIG.JWT_SECRET, {
    expiresIn: CONFIG.JWT_EXPIRES,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, CONFIG.JWT_SECRET) as AccessPayload;
};
