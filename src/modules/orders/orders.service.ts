import { Orders } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createOrder = async (payload: Orders) => {
  const result = await prisma.orders.create({
    data: {
      ...payload,
    },
  });
  return result;
};

const getOwnOrders = async (userId: string) => {
  const result = await prisma.orders.findMany({
    where: {
      userId,
    },
    include: {
      meals: {
        select: {
          title: true,
          price: true,
        },
      },
    },
  });
  return result;
};

const deleteOwnOrder = async (userId: string, orderId: string) => {
  const owner = await prisma.orders.findUniqueOrThrow({
    where: {
      id: orderId,
    },
    select: {
      userId: true,
    },
  });

  if (owner.userId !== userId) {
    throw new Error("You do not own this order");
  }

  const result = await prisma.orders.delete({
    where: {
      id: orderId,
    },
  });

  return result;
};

export const orderService = { createOrder, getOwnOrders, deleteOwnOrder };
