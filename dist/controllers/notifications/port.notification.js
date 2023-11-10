"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortNotification = void 0;
const async_handler_1 = __importDefault(require("../../helpers/async.handler"));
const email_service_1 = __importDefault(require("../../services/email.service"));
const global_error_1 = require("../../helpers/global.error");
exports.PortNotification = (0, async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, name, message } = req.body;
        if (!email || !name || !message) {
            return next(new global_error_1.AppError("Name, Email, Message are all required fields.", 400));
        }
        const subject = `Message From ${name} on Wisdom's Portfolio`;
        const SENT_FROM = process.env.EMAIL_USER;
        const REPLY_TO = email;
        const body = message;
        const RECIEPIENT = process.env.ADMIN_EMAIL_ONE;
        (0, email_service_1.default)({ subject, body, send_to: RECIEPIENT, SENT_FROM, REPLY_TO });
        res.status(200).json({
            status: "success",
            message: `Your email has been sent!✅ Thanks for reaching out😎`,
        });
    });
});
