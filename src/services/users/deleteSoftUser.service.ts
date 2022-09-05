import { FindOperator } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteSoftUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = userRepository.find();

  const user = (await users).find((user) => user.id === id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!user?.isActive) {
    throw new AppError(400, "Inactive user");
  } else {
    const change = false;
    await userRepository.update(user.id, { isActive: change });
  }
  return true;
};

export default deleteSoftUserService;
