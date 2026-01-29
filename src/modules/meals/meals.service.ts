import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { Meals } from "../../../generated/prisma/client";

const createMeal = async (data: Meals) => {
    const result = await prisma.meals.create({
      data: {
        ...data,
      },
    });
    return result;
//   console.log(data);
};

export const mealsService = { createMeal };
