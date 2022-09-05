import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

const isAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === id);

  if (!user?.isAdm) {
    throw new AppError(403, "Unauthorized!");
  } else {
    next();
  }
};

export default isAdmMiddleware;
