import AppDataSource from "../../data-source";
import { compare } from "bcrypt";
import { AppError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new AppError(403, "Invalid email or password");
  }

  const matchPassword = await compare(password, user.password);

  if (!matchPassword) {
    throw new AppError(403, "Invalid email or password");
  }

  const token = jwt.sign(
    { isAdm: user.isAdm },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "2h",
    }
  );
  return token;
};

export default createSessionService;
