import express from "express";
import { appointmentRoutes } from "./routes/appointmentRoutes";
import { providerRoutes } from "./routes/providerRoutes";
import { serviceRoutes } from "./routes/serviceRoutes";
import { userRoutes } from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use("/appointments", appointmentRoutes);
app.use("/providers", providerRoutes);
app.use("/services", serviceRoutes);
app.use("/users", userRoutes);

export { app };
