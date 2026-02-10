import { Request, Response } from "express";
import { feedBackService } from "./feedback.service";

const createFeedBack = async (req: Request, res: Response) => {
  try {
    const result = await feedBackService.createFeedBack(req.body);
    return res.status(201).json({
      success: true,
      data: { result: result, message: "Successfully posted Feedback" },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: { error: err, message: "Cannot post Feedback" },
    });
  }
};

const deleteFeedBack = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await feedBackService.deleteFeedBack(
      user?.id as string,
      id as string,
    );
    console.log(result, id);
    return res.status(200).json({
      success: true,
      data: { result: result, message: "Successfully Deleted" },
    });
  } catch (err) {
    const errorMessgae =
      err instanceof Error ? err.message : "Cannot Delete Feedback";
    return res.status(400).json({
      success: false,
      data: { error: errorMessgae, message: err },
    });
  }
};

export const feedBackController = { createFeedBack, deleteFeedBack };
