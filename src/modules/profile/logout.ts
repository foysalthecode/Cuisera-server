import { Request, Response } from "express";
import { auth } from "../../lib/auth";

export const logout = async (req: Request, res: Response) => {
  const data = await auth.api.signOut({
    headers: req.headers as any,
  });
  return res.status(200).json(data);
};

export default logout;
