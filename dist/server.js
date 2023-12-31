"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const prisma_client_1 = __importDefault(require("./lib/prisma.client"));
dotenv_1.default.config();
process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION ⛔️, Shutting down...");
    process.exit(1);
});
const PORT = process.env.PORT || 9000;
let server;
prisma_client_1.default
    .$connect()
    .then(() => {
    console.log("Database Connection Established");
    server = app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((error) => {
    console.error("Failed to connect to Database:", error);
});
process.on("unhandledRejection", (err) => {
    console.log(err);
    console.log("UNHANDLED REJECTION ⛔️, Shutting down...");
    server.close(() => {
        process.exit(1);
    });
});
