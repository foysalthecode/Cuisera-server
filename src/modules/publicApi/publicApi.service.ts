import { Cart } from "../../../generated/prisma/client";
import { MealsWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const getAllMeal = async ({
  search,
  sortOrder,
  page,
  limit,
  skip,
}: {
  search: string | undefined;
  sortOrder: "asc" | "desc" | undefined;
  page: number;
  limit: number;
  skip: number;
}) => {
  const andConditions: MealsWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: search as string,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const result = await prisma.meals.findMany({
    take: limit,
    skip: skip,
    where: {
      AND: andConditions,
    },
    orderBy: sortOrder ? { price: sortOrder || "desc" } : { createdAt: "desc" },
  });

  const total = await prisma.meals.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: result,
    pagination: { total, page, limit, totalPage: Math.ceil(total / limit) },
  };
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
