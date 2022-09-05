import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteSoftUserController from "../controllers/users/deleteSoftUser.controller";
import listUserController from "../controllers/users/listUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import userSchema from "../schemas/users.schemas";

const userRoutes = Router();

userRoutes.post("", validationMiddleware(userSchema), createUserController);
userRoutes.get("", ensureAuthMiddleware, isAdmMiddleware, listUserController);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  isAdmMiddleware,
  deleteSoftUserController
);

export default userRoutes;
