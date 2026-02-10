import { prisma } from "../../lib/prisma";
import {
  Meals,
  Orders,
  userStatus,
} from "../../../generated/prisma/client";

const createMeal = async (payload: Meals, isProvider: boolean) => {
  if (!isProvider) {
    throw new Error("You Are not a Provider");
  }
  const result = await prisma.meals.create({
    data: {
      ...payload,
    },
  });
  return result;
};

const updateMeal = async (
  mealId: string,
  data: Partial<Meals>,
  providerId: string,
) => {
  const mealData = await prisma.meals.findUniqueOrThrow({
    where: {
      id: mealId,
    },
    select: {
      userId: true,
    },
  });

  if (mealData.userId !== providerId) {
    throw new Error("You Donot Own this Meal");
  }

  const result = await prisma.meals.update({
    where: {
      id: mealId,
    },
    data,
  });
  return result;
};

const deleteMeal = async (mealId: string, providerId: string) => {
  const provider = await prisma.meals.findUniqueOrThrow({
    where: {
      id: mealId,
    },
    select: {
      userId: true,
    },
  });

  if (provider.userId !== providerId) {
    throw new Error("Unable to Delete!! You do not own this Meal");
  }

  const result = await prisma.meals.delete({
    where: {
      id: mealId,
    },
  });
  return result;
};

const updateOrderStatus = async (
  orderId: string,
  data: Partial<Orders>,
  providerId: string,
) => {
  const provider = await prisma.orders.findUniqueOrThrow({
    where: {
      id: orderId,
    },
    select: {
      userId: true,
    },
  });

  if (provider.userId !== providerId) {
    throw new Error("Unable to Update Status!! You do not own this Meal");
  }

  const result = await prisma.orders.update({
    where: {
      id: orderId,
    },
    data,
  });
  return result;
};

const viewIncomingOrders = async (providerId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: providerId,
      status: userStatus.ACTIVE,
    },
    select: {
      id: true,
    },
  });

  const orders = await prisma.orders.findMany({
    where: {
      meals: {
        userId: providerId,
      },
    },
    include: {
      meals: {
        select: {
          title: true,
        },
      },
    },
  });

  return orders;
};

export const mealsService = {
  createMeal,
  updateMeal,
  deleteMeal,
  updateOrderStatus,
  viewIncomingOrders
};
