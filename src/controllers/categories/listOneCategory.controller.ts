import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import listOneCategoryService from "../../services/categories/listOneCategory.service";

const listOneCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await listOneCategoryService(id);
  return res.json(category);
};

export default listOneCategoryController;
