import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  isAdm,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);
  if (emailAlreadyExists) {
    throw new AppError(400, "Email already exists");
  }

  if (!password) {
    throw new AppError(401, "Password is a required field");
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await userRepository.save(user);

  return user;
};
export default createUserService;
