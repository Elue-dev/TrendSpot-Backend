import { NextFunction, Response } from "express";
import handleAsync from "../../helpers/async.handler";
import { AuthenticatedRequest } from "../../models/types/auth";
import sendEmail from "../../services/email.service";
import { AppError } from "../../helpers/global.error";

export const PortNotification = handleAsync(async function (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { email, name, message } = req.body;

  if (!email || !name || !message) {
    return next(
      new AppError("Name, Email, Message are all required fields.", 400)
    );
  }

  const subject = `Message From ${name} on Wisdom's Portfolio`;
  const SENT_FROM = process.env.EMAIL_USER as string;
  const REPLY_TO = email;
  const body = message;
  const RECIEPIENT = process.env.ADMIN_EMAIL_ONE as string;

  sendEmail({ subject, body, send_to: RECIEPIENT, SENT_FROM, REPLY_TO });
  res.status(200).json({
    status: "success",
    message: `Your email has been sent!✅ Thanks for reaching out😎`,
  });
});
