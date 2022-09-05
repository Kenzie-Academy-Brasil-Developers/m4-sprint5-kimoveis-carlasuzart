import { IScheduleRequest } from "../../interfaces/schedules";
import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { Schedule } from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const createSchedulesService = async ({
  userId,
  propertyId,
  date,
  hour,
}: IScheduleRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const propertyRepository = AppDataSource.getRepository(Property);
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const schedule = scheduleRepository.find();

  if (!userId) throw new AppError(404, "User not found");
  const user = await userRepository.findOne({
    id: userId,
  });

  const property = await propertyRepository.findOneBy({
    id: propertyId,
  });

  if (!property) throw new AppError(404, "Property not found");

  const schedules = scheduleRepository.create({
    user: user,
    property: property,
    date,
    hour,
  });
};
