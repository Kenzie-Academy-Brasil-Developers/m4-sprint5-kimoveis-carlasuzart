import { IScheduleRequest } from "../../interfaces/schedules";
import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { Schedule } from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { format } from "date-fns";

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
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const property = await propertyRepository.findOneBy({
    id: propertyId,
  });

  if (!property) throw new AppError(404, "Property not found");

  const schedulesAlreadyExists = await scheduleRepository.find({
    relations: { property: true },
    where: {
      date,
      hour,
    },
  });

  if (schedulesAlreadyExists.length > 0) {
    throw new AppError(400, "This schedule already exists");
  }

  const newFormat = new Date(date + " " + hour);

  if (
    Number(format(newFormat, "ee")) === 1 ||
    Number(format(newFormat, "ee")) === 7
  ) {
    throw new AppError(400, "Open schedule only on weekdays!");
  }

  if (
    Number(format(newFormat, "H")) < 8 ||
    Number(format(newFormat, "H")) > 17
  ) {
    throw new AppError(400, "Open schedule only between 8:00h and 18:00h!");
  }

  const newSchedule = scheduleRepository.create({
    user,
    property,
    date,
    hour,
  });

  await scheduleRepository.save(newSchedule);

  return newSchedule;
};
