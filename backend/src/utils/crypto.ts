import bcrypt from "bcryptjs";

export const hash = (plain: string) => {
  return bcrypt.hash(plain, 10)
}

export const compare = (plain: string, hashed: string) => {
  return bcrypt.compare(plain, hashed)
}