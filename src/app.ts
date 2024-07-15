import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import { openApiDoc } from "./utils/swagger";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(errorHandler);

// Routes
app.use("/api", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));

export default app;
