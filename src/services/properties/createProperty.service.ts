import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Property } from "../../entities/properties.entity";
import { Address } from "../../entities/addresses.entity";
import { Category } from "../../entities/category.entity";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const propertyRepository = AppDataSource.getRepository(Property);
  const properties = propertyRepository.find();

  const addressRepository = AppDataSource.getRepository(Address);
  const addresses = addressRepository.find();
  const { district, zipCode, number, city, state } = address;

  const categories = await categoryRepository.findOneBy({
    id: categoryId,
  });
  if (!categories) {
    throw new AppError(404, "Category not found!");
  }

  const stateAlreadyExists = (await addresses).find(
    (address) => address.state === state
  );
  if (stateAlreadyExists) {
    throw new AppError(400, "State already exists");
  }

  const newAddress = addressRepository.create({
    district,
    zipCode,
    number,
    city,
    state,
  });

  await addressRepository.save(newAddress);

  const property = propertyRepository.create({
    value,
    size,
    address: newAddress,
    category: {
      id: categories?.id,
      name: categories?.name,
    },
  });

  await propertyRepository.save(property);

  return property;
};

export default createPropertyService;
