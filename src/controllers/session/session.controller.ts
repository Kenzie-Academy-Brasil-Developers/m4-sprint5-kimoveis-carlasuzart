import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import createSessionService from "../../services/session/createSession.service";
const createSessionController = async (req: Request, res: Response) => {
  const { email, password }: IUserLogin = req.body;
  const token = await createSessionService({ email, password });
  return res.json({ token });
};

export default createSessionController;
