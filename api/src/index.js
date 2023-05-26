"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const observability_1 = require("./config/observability");
const connectToDB_1 = require("./utils/connectToDB");
dotenv_1.default.config();
const main = async () => {
    const app = await (0, app_1.createApp)();
    const port = process.env.FUNCTIONS_CUSTOMHANDLER_PORT || process.env.PORT || 3100;
    (0, connectToDB_1.connectToDb)().then(() => {
        app.listen(port, () => {
            observability_1.logger.info(`Started listening on port ${port}`);
        });
    }).catch((error) => {
        observability_1.logger.error(error);
    });
    if (process.env.NODE_ENV === "dev") {
        observability_1.logger.info(`ENV is ${process.env.NODE_ENV}`);
        app.use(express_1.default.static("../web/build"));
        app.get("*", (req, res) => {
            observability_1.logger.info(`req:${req.url}`);
            res.status(200).sendFile(path_1.default.resolve(__dirname, "../..", "web", "build", "index.html"));
        });
    }
};
main();
