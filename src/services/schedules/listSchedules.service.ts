import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Schedule } from "../../entities/schedule.entity";
import { Property } from "../../entities/properties.entity";

const listScheduleService = async (idProperty: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const propertiesRepository = AppDataSource.getRepository(Property);

  const schedules = await propertiesRepository.findOne({
    where: {
      id: idProperty,
    },
    relations: {
      schedule: true,
    },
  });
  if (!schedules) {
    throw new AppError(404, "Property not found");
  }
  return schedules;
};

export default listScheduleService;
