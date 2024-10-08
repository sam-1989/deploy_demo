import { json, Router } from "express";
import fs from "fs";
import { randomUUID } from "crypto";

const tasksRouter = Router();

tasksRouter
    .get("/", (req, res) => {
        try {
            const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ msg: "Server error" });
        }
    })
    .post("/", (req, res) => {
        try {
            const { task } = req.body;
            const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
            const newTask = { id: randomUUID(), task };
            data.push(newTask);
            fs.writeFileSync("./data.json", JSON.stringify(data));
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ msg: "Server error" });
        }
    })
    .put("/:id", (req, res) => {
        try {
            const { id } = req.params;
            const { task } = req.body;

            const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

            const taskIndex = data.findIndex((obj) => obj.id === id);
            if (taskIndex === -1)
                return res.status(404).json({ msg: "Task not found!" });

            if (!task)
                return res.status(400).json({ msg: "Task is required!" });

            data[taskIndex] = { ...data[taskIndex], task };

            fs.writeFileSync("./data.json", JSON.stringify(data));
            res.status(200).json(data[taskIndex])

        } catch (error) {
            res.status(500).json({ msg: "Server error" });
        }
    })
    .delete("/:id", (req, res) => {
        try {
            const {id} = req.params;
            const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
            const taskIndex = data.findIndex(obj=>obj.id === id);
            if (taskIndex === -1) return res.status(404).json({msg:"Task not found!"});
            data.splice(taskIndex, 1);
            fs.writeFileSync("./data.json", JSON.stringify(data));
            // code 204: no content
            res.status(204).end();
            // alternativ
            // res.status(200).json({msg:"Task deleted"})
    
        } catch (error) {
            res.status(500).json({ msg: "Server error" });
        }
    });

export default tasksRouter;
