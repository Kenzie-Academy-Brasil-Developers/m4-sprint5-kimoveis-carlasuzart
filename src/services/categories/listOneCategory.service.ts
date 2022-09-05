import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/properties.entity";

const listOneCategoryService = async (idCategory: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const propertiesRepository = AppDataSource.getRepository(Property);

  const categories = await categoryRepository.findOne({
    where: {
      id: idCategory,
    },
    relations: {
      property: true,
    },
  });
  if (!categories) {
    throw new AppError(404, "Category not found");
  }

  return categories;
};

export default listOneCategoryService;
