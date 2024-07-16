import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { openApiDoc } from "./utils/swagger";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./modules/auth/routes/authRoutes";
import protectedRoutes from "./modules/protected/routes/protectedRoutes";

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
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));

export default app;
