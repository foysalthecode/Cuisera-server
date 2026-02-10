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

const getAllOrders = async () => {
  const result = await prisma.orders.findMany();
  return result;
};

const getOwnOrders = async (userId: string) => {
  const result = await prisma.orders.findMany({
    where: {
      userId,
    },
  });
  return result;
};

export const orderService = { createOrder, getAllOrders, getOwnOrders };
