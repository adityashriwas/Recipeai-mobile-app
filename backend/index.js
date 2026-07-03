import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categories.route.js";
import productsRouter from "./routes/products.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(bodyParser.raw({ type: "application/json" }));

// Routes
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productsRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server is running on port ${process.env.PORT || 3000}`);
});
