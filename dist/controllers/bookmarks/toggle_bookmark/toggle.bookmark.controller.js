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
exports.toggleBookmark = void 0;
const async_handler_1 = __importDefault(require("../../../helpers/async.handler"));
const global_error_1 = require("../../../helpers/global.error");
const prisma_client_1 = __importDefault(require("../../../lib/prisma.client"));
exports.toggleBookmark = (0, async_handler_1.default)(function (req, res, next) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const { newsId } = req.params;
        if (!newsId)
            return next(new global_error_1.AppError("Please provide the id of the news", 400));
        const newsToBookmark = yield prisma_client_1.default.news.findFirst({
            where: {
                id: newsId,
            },
            include: {
                bookmarks: true,
            },
        });
        if (!newsToBookmark)
            return next(new global_error_1.AppError("News could not be found", 400));
        const userHasBookmarked = (_a = newsToBookmark === null || newsToBookmark === void 0 ? void 0 : newsToBookmark.bookmarks) === null || _a === void 0 ? void 0 : _a.find((bookmark) => { var _a; return bookmark.userId === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); });
        if (userHasBookmarked) {
            yield prisma_client_1.default.bookmark.deleteMany({
                where: {
                    userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
                    newsId,
                },
            });
            yield prisma_client_1.default.activity.create({
                data: {
                    description: "removed a news from your bookmarks",
                    category: "news",
                    action: "remove bookmark",
                    userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id,
                },
            });
        }
        else {
            yield prisma_client_1.default.bookmark.create({
                data: {
                    userId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id,
                    newsId,
                },
            });
            yield prisma_client_1.default.activity.create({
                data: {
                    description: "added a news to your bookmarks",
                    category: "news",
                    action: "add bookmark",
                    userId: (_e = req.user) === null || _e === void 0 ? void 0 : _e.id,
                },
            });
        }
        res.status(200).json({
            status: "success",
            message: userHasBookmarked
                ? "News removed from bookmarks"
                : "News added to bookmarks",
        });
    });
});
