import { Router } from "express";
import createScheduleController from "../controllers/schedules/createSchedules.controller";
import listScheduleController from "../controllers/schedules/listSchedule.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const scheduleRoutes = Router();

scheduleRoutes.post("", ensureAuthMiddleware, createScheduleController);
scheduleRoutes.get(
  "/properties/:id",
  ensureAuthMiddleware,
  isAdmMiddleware,
  listScheduleController
);

export default scheduleRoutes;
