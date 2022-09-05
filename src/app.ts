import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes";
import categoryRoutes from "./routes/category.routes";
import propertyRoutes from "./routes/property.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/categories", categoryRoutes);
app.use("/properties", propertyRoutes);

app.use(handleErrorMiddleware);

export default app;
