import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { mealsRoter } from "./modules/meals/meals.routes";
import { auth } from "./lib/auth";



const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/provider", mealsRoter);

app.get("/", (req, res) => {
  res.send("Cuisera Server is running");
});

export default app;
