import { userStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllOrders = async () => {
  const result = await prisma.orders.findMany();
  return result;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const updateUserStatus = async (userId: string, data: Partial<userStatus>) => {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
  return result;
};

export const adminControllService = {
  getAllOrders,
  getAllUsers,
  updateUserStatus,
};
