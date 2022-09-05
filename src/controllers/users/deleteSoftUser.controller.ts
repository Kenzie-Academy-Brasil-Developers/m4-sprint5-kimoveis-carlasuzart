import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import deleteSoftUserService from "../../services/users/deleteSoftUser.service";

const deleteSoftUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(404, "User not found");
  }

  await deleteSoftUserService(id);
  return res.status(204).send();
};

export default deleteSoftUserController;
