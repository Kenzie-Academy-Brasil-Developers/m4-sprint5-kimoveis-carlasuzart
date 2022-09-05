import { Request, Response } from "express";

import createSchedulesService from "../../services/schedules/createSchedules.service";

const createScheduleController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const userId = id;
  const { propertyId, date, hour } = req.body;

  const schedule = await createSchedulesService({
    userId,
    propertyId,
    date,
    hour,
  });

  return res.status(201).json(schedule);
};
export default createScheduleController;
