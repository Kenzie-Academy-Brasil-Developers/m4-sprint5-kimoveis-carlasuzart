import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";

const listUserService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  if (users.length === 0) {
    throw new AppError(403, "User not found");
  }
  return users;
};

export default listUserService;
