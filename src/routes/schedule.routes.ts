import { Router } from "express";
import createScheduleController from "../controllers/schedules/createSchedules.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const scheduleRoutes = Router();

scheduleRoutes.post("", ensureAuthMiddleware, createScheduleController);

export default scheduleRoutes;
