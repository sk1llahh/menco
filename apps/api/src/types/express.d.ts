import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user?: { userId: string; login: string; isAdmin?: boolean };
  }
}
