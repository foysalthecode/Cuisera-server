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

export const orderService = { createOrder };
