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
import profile from "./modules/profile/profile";
import { UserRole } from "./middleware/auth";
import authentication from "./middleware/auth";
import logout from "./modules/profile/logout";
const app: Application = express();

const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL,
].filter(Boolean);

app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.APP_URL || "http://localhost:3000",
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
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

//??feedback routes
app.use("/api/feedback", feedBackRouter);

//?? profile

app.get(
  "/api/my-profile",
  authentication(UserRole.ADMIN, UserRole.USER, UserRole.PROVIDER),
  profile,
);

//?? logout
app.post("/api/logout", logout);

app.get("/", (req, res) => {
  res.send("Cuisera Server is running");
});

app.use(notFound);

export default app;
