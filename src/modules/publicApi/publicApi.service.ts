import { Cart } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllMeal = async (payload: {
  search?: string | undefined;
  sortOrder?: string | undefined;
}) => {
  const result = await prisma.meals.findMany({
    where: {
      OR: [
        {
          title: {
            contains: payload.search as string,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: payload.search as string,
            mode: "insensitive",
          },
        },
      ],
    },
    // orderBy: {
    //   price: payload.sortOrder,
    // },
  });
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
