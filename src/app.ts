import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { resolve } from "path";
import { useSwaggerDocs } from "./utils/swagger";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Swagger UI
const openApiYamlPath = resolve(__dirname, "api", "spec.yaml");
useSwaggerDocs(openApiYamlPath, app);

export default app;
