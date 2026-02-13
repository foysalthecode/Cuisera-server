import { Request, Response } from "express";
import { auth } from "../../lib/auth";

const profile = async (req: Request, res: Response) => {
  const userData = await auth.api.getSession({
    headers: req.headers as any,
  });
  return res.status(200).json(userData?.user);
};

export default profile;
