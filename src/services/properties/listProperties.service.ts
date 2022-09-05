import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Property } from "../../entities/properties.entity";

const listPropertiesService = async () => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const properties = await propertyRepository.find();

  if (!properties) {
    throw new AppError(404, "No properties found");
  }
  return properties;
};

export default listPropertiesService;
