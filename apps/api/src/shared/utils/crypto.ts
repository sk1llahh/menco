import crypto from "crypto";
import bcrypt from "bcryptjs";

export const hashPassword = (plain: string) => {
  return bcrypt.hash(plain, 10);
};

export const comparePassword = (plain: string, hashed: string) => {
  return bcrypt.compare(plain, hashed);
};

export const sha256 = (input: string) => {
  return crypto.createHash("sha256").update(input).digest("hex");
};

export const randomToken = (bytes = 64) => {
  return crypto.randomBytes(bytes).toString("hex");
};
