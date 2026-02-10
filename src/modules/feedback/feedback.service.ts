import { Feedback } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createFeedBack = async (payload: Feedback) => {
  const result = await prisma.feedback.create({
    data: {
      ...payload,
    },
  });
  return result;
};

const deleteFeedBack = async (userId: string, feedBackId: string) => {
  const feedBackData = await prisma.feedback.findFirst({
    where: {
      id: feedBackId,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!feedBackData) {
    throw new Error("Invalid input . Coudn't Delete ");
  }

  const result = await prisma.feedback.delete({
    where: {
      id: feedBackData.id,
    },
  });

  return result;
};

export const feedBackService = { createFeedBack, deleteFeedBack };
