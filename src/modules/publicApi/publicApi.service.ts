import { Cart } from "../../../generated/prisma/client";
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

const getAllProviders = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: "PROVIDER",
    },
  });
  return result;
};

const getSingleProvider = async (providerId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: providerId,
    },
    include: {
      meals: true,
    },
  });
  return result;
};

const addMealsToCart = async (payload: Cart) => {
  const result = await prisma.cart.create({
    data: {
      ...payload,
    },
  });

  return result;
};

export const publicApiService = {
  getAllMeal,
  getSingleMeal,
  getAllProviders,
  getSingleProvider,
  addMealsToCart,
};
