import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import createPropertyService from "../../services/properties/createProperty.service";

const createPropertyController = async (req: Request, res: Response) => {
  const {
    value,
    size,
    address: { district, zipCode, number, city, state },
    categoryId,
  } = req.body;

  const property = await createPropertyService({
    value,
    size,
    address: { district, zipCode, number, city, state },
    categoryId,
  });
  return res.status(201).json(property);
};

export default createPropertyController;
