import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import listScheduleService from "../../services/schedules/listSchedules.service";

const listScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedulesProperties = await listScheduleService(id);

  return res.json(schedulesProperties);
};

export default listScheduleController;
