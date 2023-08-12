import { NextFunction, Request, Response } from "express";
import handleAsync from "../../../helpers/async.handler";
import { AppError } from "../../../helpers/global.error";
import { AuthenticatedRequest } from "../../../models/types/auth";
import prisma from "../../../lib/prisma.client";

export const deActivateUser = handleAsync(async function (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.body;
  if (!userId) return next(new AppError("Please specify the user id", 404));

  const existingUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!existingUser) return next(new AppError("User could not be found", 404));
  const isDeactivatedByAdmin = req.user?.isAdmin ? true : false;

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      isDeactivated: true,
      isDeactivatedByAdmin,
    },
  });

  res.status(200).json({
    status: "success",
    message: "Account deactivated",
  });
});