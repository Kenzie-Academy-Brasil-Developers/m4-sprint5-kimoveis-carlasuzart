import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const { email, isAdm, name, password }: IUserRequest = req.body;
  const user = await createUserService({ email, isAdm, name, password });
  return res.status(201).json(user);
};

export default createUserController;
