// src/app.ts
import express5 from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/modules/meals/meals.routes.ts
import express from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String     @id\n  name          String\n  email         String\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  role          String?    @default("USER")\n  phone         String?\n  status        userStatus @default(ACTIVE)\n  sessions      Session[]\n  accounts      Account[]\n  feedbacks     Feedback[]\n  meals         Meals[]\n  orders        Orders[]\n  carts         Cart[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nenum userStatus {\n  ACTIVE\n  STALLED\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum customerStatus {\n  ACTIVE\n  STALLED\n}\n\nmodel Cart {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id])\n  mealId String\n  meal   Meals  @relation(fields: [mealId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Feedback {\n  id      String @id @default(uuid())\n  content String @db.Text\n  review  Int\n  userId  String\n  user    User   @relation(fields: [userId], references: [id])\n  mealId  String\n  meal    Meals  @relation(fields: [mealId], references: [id])\n\n  @@index([userId])\n  @@index([mealId])\n}\n\nmodel Meals {\n  id          String     @id @default(uuid())\n  title       String     @db.VarChar(225)\n  description String     @db.Text\n  thumbnail   String?\n  isPublished Boolean    @default(true)\n  isFeatured  Boolean    @default(false)\n  status      MealStatus @default(PUBLISHED)\n  review      String?\n  price       Int\n  category    String\n  createdAt   DateTime   @default(now())\n  updatedAt   DateTime   @updatedAt\n  userId      String\n  user        User       @relation(fields: [userId], references: [id])\n  orders      Orders[]\n  feedback    Feedback[]\n  carts       Cart[]\n}\n\nenum MealStatus {\n  PUBLISHED\n  DRAFT\n  CANCELED\n}\n\nmodel Orders {\n  id      String      @id @default(uuid())\n  status  OrderStatus @default(PENDING)\n  address String      @db.Text\n  userId  String\n  user    User        @relation(fields: [userId], references: [id])\n  mealId  String\n  meals   Meals       @relation(fields: [mealId], references: [id])\n}\n\nenum OrderStatus {\n  CANCELED\n  PENDING\n  PREPARING\n  READY\n  DELIVERD\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"userStatus"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"feedbacks","kind":"object","type":"Feedback","relationName":"FeedbackToUser"},{"name":"meals","kind":"object","type":"Meals","relationName":"MealsToUser"},{"name":"orders","kind":"object","type":"Orders","relationName":"OrdersToUser"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meals","relationName":"CartToMeals"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Feedback":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"review","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"FeedbackToUser"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meals","relationName":"FeedbackToMeals"}],"dbName":null},"Meals":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"MealStatus"},{"name":"review","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"category","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"MealsToUser"},{"name":"orders","kind":"object","type":"Orders","relationName":"MealsToOrders"},{"name":"feedback","kind":"object","type":"Feedback","relationName":"FeedbackToMeals"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToMeals"}],"dbName":null},"Orders":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"address","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrdersToUser"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meals","relationName":"MealsToOrders"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/meals/meals.service.ts
var createMeal = async (payload, isProvider) => {
  if (!isProvider) {
    throw new Error("You Are not a Provider");
  }
  const result = await prisma.meals.create({
    data: {
      ...payload
    }
  });
  return result;
};
var updateMeal = async (mealId, data, providerId) => {
  const mealData = await prisma.meals.findUniqueOrThrow({
    where: {
      id: mealId
    },
    select: {
      userId: true
    }
  });
  if (mealData.userId !== providerId) {
    throw new Error("You Donot Own this Meal");
  }
  const result = await prisma.meals.update({
    where: {
      id: mealId
    },
    data
  });
  return result;
};
var deleteMeal = async (mealId, providerId) => {
  const provider = await prisma.meals.findUniqueOrThrow({
    where: {
      id: mealId
    },
    select: {
      userId: true
    }
  });
  if (provider.userId !== providerId) {
    throw new Error("Unable to Delete!! You do not own this Meal");
  }
  const result = await prisma.meals.delete({
    where: {
      id: mealId
    }
  });
  return result;
};
var updateOrderStatus = async (orderId, data, providerId) => {
  const provider = await prisma.orders.findUniqueOrThrow({
    where: {
      id: orderId
    },
    include: {
      meals: {
        select: {
          userId: true
        }
      }
    }
  });
  console.log(provider.meals.userId);
  if (provider.meals.userId !== providerId) {
    throw new Error("Unable to Update Status!! You do not own this Meal");
  }
  const result = await prisma.orders.update({
    where: {
      id: orderId
    },
    data
  });
  return result;
};
var viewIncomingOrders = async (providerId) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: providerId
    },
    select: {
      id: true
    }
  });
  const orders = await prisma.orders.findMany({
    where: {
      meals: {
        userId: providerId
      }
    },
    include: {
      meals: {
        select: {
          title: true
        }
      }
    }
  });
  return orders;
};
var mealsService = {
  createMeal,
  updateMeal,
  deleteMeal,
  updateOrderStatus,
  viewIncomingOrders
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
      const info = await transporter.sendMail({
        from: '"Cuisera" <cuisera.res@gmail.com>',
        to: user.email,
        subject: "Please Verify Your Email",
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email - Cuisera</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#ff4d2d; padding:25px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:28px; letter-spacing:1px;">
                Cuisera \u{1F37D}\uFE0F
              </h1>
              <p style="margin:8px 0 0; color:#ffe9e4; font-size:14px;">
                Your Food, Delivered Smartly
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px 30px; color:#333333;">
              <h2 style="margin-top:0; font-size:22px;">
                Verify your email address
              </h2>

              <p style="font-size:15px; line-height:1.6; color:#555;">
                Thanks for signing up with <strong>Cuisera</strong>!  
                Please confirm your email address to start ordering delicious meals from your favorite restaurants.
              </p>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" style="margin:30px auto;">
                <tr>
                  <td align="center">
                    <a href="${verificationUrl}"
                      style="background:#ff4d2d; color:#ffffff; text-decoration:none; padding:14px 30px; font-size:16px; font-weight:bold; border-radius:8px; display:inline-block;">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px; color:#777; line-height:1.6;">
                If the button doesn\u2019t work, copy and paste this link into your browser:
              </p>

              <p style="font-size:13px; word-break:break-all; color:#ff4d2d;">
                ${verificationUrl}
              </p>

              <p style="font-size:14px; color:#777; margin-top:25px;">
                If you didn\u2019t create an account on Cuisera, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fafafa; padding:20px; text-align:center; font-size:12px; color:#999;">
              \xA9 2026 Cuisera. All rights reserved.<br/>
              Made with \u2764\uFE0F for food lovers
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
        `
        // HTML version of the message
      });
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/middleware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "you are not authorized"
        });
      }
      if (!session?.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email is not Verified"
        });
      }
      req.user = {
        id: session?.user?.id,
        email: session?.user?.email,
        name: session?.user?.name,
        role: session?.user?.role,
        emailVerified: session?.user?.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        res.status(403).json({
          success: false,
          message: "Forbidden access !!! Yon dont have permission to access this"
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var auth_default = auth2;

// src/modules/meals/meals.controller.ts
var createMeal2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found,login to procced");
    }
    const isProvider = user?.role === "PROVIDER" /* PROVIDER */;
    const result = await mealsService.createMeal(req.body, isProvider);
    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    const erroMessage = err instanceof Error ? err.message : "Couldn't Create Meal";
    return res.status(400).json({
      success: false,
      data: { error: erroMessage, message: err }
    });
  }
};
var updateMeal2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("unable to update.Login to Procced");
    }
    const { id } = req.params;
    const result = await mealsService.updateMeal(
      id,
      req.body,
      user.id
    );
    return res.status(200).json({
      success: true,
      data: { result, message: "Updated Successfully" }
    });
  } catch (err) {
    const erroMessage = err instanceof Error ? err.message : "Meal Update Failed";
    return res.status(400).json({
      success: false,
      data: { error: erroMessage, message: err }
    });
  }
};
var deleteMeal2 = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await mealsService.deleteMeal(
      id,
      user?.id
    );
    return res.status(200).json({
      success: true,
      data: { result, message: "Deleted Successfully" }
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Meal Delete Failed";
    return res.status(400).json({
      success: false,
      data: { error: errorMessage, message: err }
    });
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await mealsService.updateOrderStatus(
      id,
      req.body,
      user?.id
    );
    return res.status(200).json({
      success: true,
      data: { result, message: "Updated Successfully" }
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Status Update Unsuccessfull";
    return res.status(400).json({
      success: false,
      data: { error: errorMessage, message: err }
    });
  }
};
var viewIncomingOrders2 = async (req, res) => {
  try {
    const user = req.user;
    const result = await mealsService.viewIncomingOrders(user?.id);
    return res.status(200).json({
      success: true,
      data: { result, message: "Order Retirve Successfully" }
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unathorized access";
    return res.status(403).json({
      success: false,
      data: { error: errorMessage, messsage: err }
    });
  }
};
var mealsController = {
  createMeal: createMeal2,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2,
  updateOrderStatus: updateOrderStatus2,
  viewIncomingOrders: viewIncomingOrders2
};

// src/modules/meals/meals.routes.ts
var router = express.Router();
router.get(
  "/meals/orders",
  auth_default("PROVIDER" /* PROVIDER */),
  mealsController.viewIncomingOrders
);
router.post("/meals", auth_default("PROVIDER" /* PROVIDER */), mealsController.createMeal);
router.put("/meals/:id", auth_default("PROVIDER" /* PROVIDER */), mealsController.updateMeal);
router.delete(
  "/meals/:id",
  auth_default("PROVIDER" /* PROVIDER */),
  mealsController.deleteMeal
);
router.patch(
  "/orders/:id",
  auth_default("PROVIDER" /* PROVIDER */),
  mealsController.updateOrderStatus
);
var mealsRoter = router;

// src/modules/orders/orders.routes.ts
import express2 from "express";

// src/modules/orders/orders.service.ts
var createOrder = async (payload) => {
  const result = await prisma.orders.create({
    data: {
      ...payload
    }
  });
  return result;
};
var getOwnOrders = async (userId) => {
  const result = await prisma.orders.findMany({
    where: {
      userId
    },
    include: {
      meals: {
        select: {
          title: true,
          price: true
        }
      }
    }
  });
  return result;
};
var orderService = { createOrder, getOwnOrders };

// src/modules/orders/orders.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err
    });
  }
};
var getOwnOrders2 = async (req, res) => {
  try {
    const user = req.user;
    const result = await orderService.getOwnOrders(user?.id);
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err
    });
  }
};
var orderController = { createOrder: createOrder2, getOwnOrders: getOwnOrders2 };

// src/modules/orders/orders.routes.ts
var router2 = express2.Router();
router2.get("/", auth_default("USER" /* USER */), orderController.getOwnOrders);
router2.post("/", orderController.createOrder);
var orderRouter = router2;

// src/modules/publicApi/publicapi.routes.ts
import express3 from "express";

// src/modules/publicApi/publicApi.service.ts
var getAllMeal = async ({
  search,
  sortOrder,
  page,
  limit,
  skip
}) => {
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          category: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const result = await prisma.meals.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    include: {
      user: {
        select: {
          name: true
        }
      }
    },
    orderBy: sortOrder ? { price: sortOrder || "desc" } : { createdAt: "desc" }
  });
  const total = await prisma.meals.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data: result,
    pagination: { total, page, limit, totalPage: Math.ceil(total / limit) }
  };
};
var getSingleMeal = async (mealId) => {
  const result = await prisma.meals.findUniqueOrThrow({
    where: {
      id: mealId
    }
  });
  return result;
};
var getAllProviders = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: "PROVIDER"
    }
  });
  return result;
};
var getSingleProvider = async (providerId) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: providerId
    },
    include: {
      meals: true
    }
  });
  return result;
};
var addMealsToCart = async (payload) => {
  const result = await prisma.cart.create({
    data: {
      ...payload
    }
  });
  return result;
};
var getCart = async (userId) => {
  const result = await prisma.cart.findMany({
    where: {
      userId
    },
    include: {
      meal: {
        select: {
          title: true,
          thumbnail: true,
          price: true
        }
      }
    }
  });
  return result;
};
var deleteFromCart = async (mealId, userId) => {
  const result = await prisma.cart.delete({
    where: {
      id: mealId,
      userId
    }
  });
  return result;
};
var publicApiService = {
  getAllMeal,
  getSingleMeal,
  getAllProviders,
  getSingleProvider,
  getCart,
  addMealsToCart,
  deleteFromCart
};

// src/helper/paginationSortinghelper.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 8;
  const skip = (page - 1) * limit;
  const sortOrder = options.sort === "desc" ? "desc" : "asc";
  return { page, limit, skip, sortOrder };
};
var paginationSortinghelper_default = paginationSortingHelper;

// src/modules/publicApi/publicApi.controller.ts
var getAllMeal2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const { page, limit, skip, sortOrder } = paginationSortinghelper_default(req.query);
    const result = await publicApiService.getAllMeal({
      search: searchString,
      sortOrder,
      page,
      limit,
      skip
    });
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      data: { error: err, message: "Couldn't Retrive any data" }
    });
  }
};
var getSingleMeal2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await publicApiService.getSingleMeal(id);
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      data: { error: err, message: "Coundn't find any data" }
    });
  }
};
var getAllProviders2 = async (req, res) => {
  try {
    const result = await publicApiService.getAllProviders();
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      data: { error: err, message: "Coundn't find any data" }
    });
  }
};
var getSingleProvider2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await publicApiService.getSingleProvider(id);
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: { error: err, data: "Coundn't find any data" }
    });
  }
};
var getCart2 = async (req, res) => {
  try {
    const id = req.user?.id;
    const result = await publicApiService.getCart(id);
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: { error: err, data: "Coundn't find any data" }
    });
  }
};
var addMealsToCart2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).json({
        message: "Unauthorizes access. Login to continue"
      });
    }
    const result = await publicApiService.addMealsToCart(req.body);
    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err
    });
  }
};
var deleteFromCart2 = async (req, res) => {
  try {
    const { cartId } = req.params;
    const id = req.user?.id;
    const result = await publicApiService.deleteFromCart(cartId, id);
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err
    });
  }
};
var publicApiController = {
  getAllMeal: getAllMeal2,
  getSingleMeal: getSingleMeal2,
  getAllProviders: getAllProviders2,
  getSingleProvider: getSingleProvider2,
  getCart: getCart2,
  addMealsToCart: addMealsToCart2,
  deleteFromCart: deleteFromCart2
};

// src/modules/publicApi/publicapi.routes.ts
var router3 = express3.Router();
router3.get("/meals", publicApiController.getAllMeal);
router3.get("/meals/:id", publicApiController.getSingleMeal);
router3.get("/providers", publicApiController.getAllProviders);
router3.get("/providers/:id", publicApiController.getSingleProvider);
router3.get(
  "/cart",
  auth_default("USER" /* USER */, "PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */),
  publicApiController.getCart
);
router3.post(
  "/cart",
  auth_default("USER" /* USER */, "PROVIDER" /* PROVIDER */),
  publicApiController.addMealsToCart
);
router3.delete(
  "/cart/:cartId",
  auth_default("USER" /* USER */),
  publicApiController.deleteFromCart
);
var PublicApirouter = router3;

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route Not Found !!!",
    path: req.originalUrl,
    Date: Date()
  });
}

// src/modules/feedback/feedback.routes.ts
import expres from "express";

// src/modules/feedback/feedback.service.ts
var createFeedBack = async (payload) => {
  const result = await prisma.feedback.create({
    data: {
      ...payload
    }
  });
  return result;
};
var deleteFeedBack = async (userId, feedBackId) => {
  const feedBackData = await prisma.feedback.findFirst({
    where: {
      id: feedBackId,
      userId
    },
    select: {
      id: true
    }
  });
  if (!feedBackData) {
    throw new Error("Invalid input . Coudn't Delete ");
  }
  const result = await prisma.feedback.delete({
    where: {
      id: feedBackData.id
    }
  });
  return result;
};
var feedBackService = { createFeedBack, deleteFeedBack };

// src/modules/feedback/feedback.controller.ts
var createFeedBack2 = async (req, res) => {
  try {
    const result = await feedBackService.createFeedBack(req.body);
    return res.status(201).json({
      success: true,
      data: { result, message: "Successfully posted Feedback" }
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: { error: err, message: "Cannot post Feedback" }
    });
  }
};
var deleteFeedBack2 = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await feedBackService.deleteFeedBack(
      user?.id,
      id
    );
    console.log(result, id);
    return res.status(200).json({
      success: true,
      data: { result, message: "Successfully Deleted" }
    });
  } catch (err) {
    const errorMessgae = err instanceof Error ? err.message : "Cannot Delete Feedback";
    return res.status(400).json({
      success: false,
      data: { error: errorMessgae, message: err }
    });
  }
};
var feedBackController = { createFeedBack: createFeedBack2, deleteFeedBack: deleteFeedBack2 };

// src/modules/feedback/feedback.routes.ts
var router4 = expres.Router();
router4.post("/", auth_default("USER" /* USER */), feedBackController.createFeedBack);
router4.delete("/:id", auth_default("USER" /* USER */), feedBackController.deleteFeedBack);
var feedBackRouter = router4;

// src/modules/adminControll/adminControll.routes.ts
import express4 from "express";

// src/modules/adminControll/adminControll.service.ts
var getAllOrders = async () => {
  const result = await prisma.orders.findMany({
    include: {
      meals: {
        select: {
          title: true,
          price: true,
          isPublished: true,
          createdAt: true
        }
      }
    }
  });
  return result;
};
var getAllUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};
var updateUserStatus = async (userId, data) => {
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data
  });
  return result;
};
var adminControllService = {
  getAllOrders,
  getAllUsers,
  updateUserStatus
};

// src/modules/adminControll/adminControll.controller.ts
var getAllOrders2 = async (req, res) => {
  try {
    const result = await adminControllService.getAllOrders();
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err
    });
  }
};
var getAllUsers2 = async (req, res) => {
  try {
    const result = await adminControllService.getAllUsers();
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await adminControllService.updateUserStatus(
      id,
      req.body
    );
    return res.status(200).json({
      success: true,
      data: { result, message: "Successfull Updated Status" }
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err
    });
  }
};
var adminControllController = {
  getAllOrders: getAllOrders2,
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2
};

// src/modules/adminControll/adminControll.routes.ts
var router5 = express4.Router();
router5.get(
  "/allorders",
  auth_default("ADMIN" /* ADMIN */),
  adminControllController.getAllOrders
);
router5.get(
  "/allusers",
  auth_default("ADMIN" /* ADMIN */),
  adminControllController.getAllUsers
);
router5.patch(
  "/status/:id",
  auth_default("ADMIN" /* ADMIN */),
  adminControllController.updateUserStatus
);
var adminControllRouter = router5;

// src/modules/profile/profile.ts
var profile = async (req, res) => {
  const userData = await auth.api.getSession({
    headers: req.headers
  });
  if (!userData) {
    return res.status(403).json({
      success: false,
      message: "You're Unauthorized"
    });
  }
  return res.status(200).json(userData?.user);
};
var profile_default = profile;

// src/app.ts
var app = express5();
app.use(express5.json());
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/admincontroll", adminControllRouter);
app.use("/api/provider", mealsRoter);
app.use("/api/orders", orderRouter);
app.use("/api", PublicApirouter);
app.use("/api/feedback", feedBackRouter);
app.get(
  "/api/my-profile",
  auth_default("ADMIN" /* ADMIN */, "USER" /* USER */, "PROVIDER" /* PROVIDER */),
  profile_default
);
app.get("/", (req, res) => {
  res.send("Cuisera Server is running");
});
app.use(notFound);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
