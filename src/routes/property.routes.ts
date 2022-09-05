import { Router } from "express";
import createPropertyController from "../controllers/properties/createProperties.controller";
import listPropertiesController from "../controllers/properties/listProperties.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const propertyRoutes = Router();

propertyRoutes.post(
  "",
  ensureAuthMiddleware,
  isAdmMiddleware,
  createPropertyController
);

propertyRoutes.get("", listPropertiesController);

export default propertyRoutes;
