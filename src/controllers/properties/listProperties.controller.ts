import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import listPropertiesService from "../../services/properties/listProperties.service";

const listPropertiesController = async (req: Request, res: Response) => {
  const properties = await listPropertiesService();
  return res.status(201).json(properties);
};

export default listPropertiesController;
