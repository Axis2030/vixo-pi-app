import express from "express";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/users";
import videoRouter from "./routes/videos";
import projectRouter from "./routes/projects";
import notifRouter from "./routes/notifications";

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/projects", projectRouter);
app.use("/api/notifications", notifRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server up", port));