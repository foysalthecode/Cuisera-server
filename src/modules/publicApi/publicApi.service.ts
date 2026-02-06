import { prisma } from "../../lib/prisma";

const getAllMeal = async () => {
  const result = await prisma.meals.findMany();
  return result;
};

const getSingleMeal = async (mealId: string) => {
  const result = await prisma.meals.findUniqueOrThrow({
    where: {
      id: mealId,
    },
  });
  return result;
};

export const publicApiService = { getAllMeal, getSingleMeal };
