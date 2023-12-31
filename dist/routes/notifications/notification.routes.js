"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const get_user_notifications_1 = require("../../controllers/notifications/get.user.notifications");
const mark_as_read_1 = require("../../controllers/notifications/mark.as.read");
const delete_notification_1 = require("../../controllers/notifications/delete.notification");
const delete_all_notifications_1 = require("../../controllers/notifications/delete.all.notifications");
const port_notification_1 = require("../../controllers/notifications/port.notification");
const router = (0, express_1.Router)();
router.post("/portfolio", port_notification_1.PortNotification);
router.use(auth_middleware_1.verifyAuth);
router.get("/", get_user_notifications_1.getUserNotifications);
router.patch("/mark-as-read/:id", mark_as_read_1.markAsread);
router.delete("/", delete_all_notifications_1.deleteAllNotifications);
router.delete("/:notifId", delete_notification_1.deleteNotification);
exports.default = router;
