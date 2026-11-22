import express from "express";
import morgan from "morgan";

import { globalErrorController } from "./controllers/globalErrorController.js";
import { AppError } from "./utils/AppError.js";

import authRouter from "./routes/authRoute.js";
import productRouter from "./routes/productsRoute.js";
import usersRouter from "./routes/usersRoute.js";
import orderRouter from "./routes/orderRoute.js";
import categoriesRouter from "./routes/categoriesRoute.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.set("query parser", "extended");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/category", categoriesRouter);
// app.use("/api/v1/cart");
// app.use("/api/v1/admin");

app.all(`/{*splat}`, (req, res, next) => {
  next(new AppError(404, `Page not found ${req.originalUrl}`));
});

app.use(globalErrorController);

export default app;
