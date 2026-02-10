import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { mealsRoter } from "./modules/meals/meals.routes";
import { auth } from "./lib/auth";
import { orderRouter } from "./modules/orders/orders.routes";
import { PublicApirouter } from "./modules/publicApi/publicapi.routes";
import { notFound } from "./middleware/notFound";
import { feedBackRouter } from "./modules/feedback/feedback.routes";
import { adminControllRouter } from "./modules/adminControll/adminControll.routes";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);

//authentication routes
app.all("/api/auth/*splat", toNodeHandler(auth));

//admin controlles

app.use("/api/admincontroll", adminControllRouter);

//meals routes
app.use("/api/provider", mealsRoter);

//order routes
app.use("/api/orders", orderRouter);

//meals and providers public routes
app.use("/api", PublicApirouter);

//feedback routes
app.use("/api/feedback", feedBackRouter);

app.get("/", (req, res) => {
  res.send("Cuisera Server is running");
});

app.use(notFound);

export default app;
