import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { Meals } from "../../../generated/prisma/client";

const createMeal = async (payload: Meals) => {
  const result = await prisma.meals.create({
    data: {
      ...payload,
    },
  });
  return result;
  //   console.log(data);
};

const updateMeal = async (mealId: string, data: Partial<Meals>) => {
  const result = await prisma.meals.update({
    where: {
      id: mealId,
    },
    data,
  });
  return result;
};

const deleteMeal = async (mealId: string) => {
  const result = await prisma.meals.delete({
    where: {
      id: mealId,
    },
  });
  return result;
};

export const mealsService = { createMeal, updateMeal, deleteMeal };
