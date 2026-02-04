import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  PROVIDER = "PROVIDER",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "you are not authorized",
        });
      }

      if (!session?.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email is not Verified",
        });
      }

      req.user = {
        id: session?.user?.id as string,
        email: session?.user?.email as string,
        name: session?.user?.name as string,
        role: session?.user?.id as string,
        emailVerified: session?.user?.emailVerified as boolean,
      };

      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        res.status(403).json({
          success: false,
          message:
            "Forbidden access !!! Yon dont have permission to access this",
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
