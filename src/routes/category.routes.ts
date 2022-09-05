import { Router } from "express";
import createCategoryController from "../controllers/categories/createCategory.controller";
import listCategoriesController from "../controllers/categories/listCategories.controller";
import listOneCategoryController from "../controllers/categories/listOneCategory.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const categoryRoutes = Router();

categoryRoutes.post(
  "",
  ensureAuthMiddleware,
  isAdmMiddleware,
  createCategoryController
);

categoryRoutes.get("", listCategoriesController);
categoryRoutes.get("/:id/properties", listOneCategoryController);

export default categoryRoutes;
