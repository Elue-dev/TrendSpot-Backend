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
exports.deActivateUser = void 0;
const async_handler_1 = __importDefault(require("../../../helpers/async.handler"));
const global_error_1 = require("../../../helpers/global.error");
const prisma_client_1 = __importDefault(require("../../../lib/prisma.client"));
exports.deActivateUser = (0, async_handler_1.default)(function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        if (!userId)
            return next(new global_error_1.AppError("Please specify the user id", 404));
        const existingUser = yield prisma_client_1.default.user.findFirst({
            where: {
                id: userId,
            },
        });
        if (!existingUser)
            return next(new global_error_1.AppError("User could not be found", 404));
        const isDeactivatedByAdmin = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) ? true : false;
        yield prisma_client_1.default.user.update({
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
});
