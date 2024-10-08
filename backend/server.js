import express from "express";
import tasksRouter from "./routes/tasks.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", tasksRouter);

app.listen(3001, () => {
    console.log("Der Server hört auf Port 3001!");
});
