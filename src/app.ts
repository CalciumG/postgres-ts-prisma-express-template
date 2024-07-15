import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import { openApiDoc } from "./utils/swagger";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));

export default app;
