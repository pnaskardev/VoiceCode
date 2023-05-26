"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LogLevel = void 0;
const winston_1 = __importDefault(require("winston"));
var LogLevel;
(function (LogLevel) {
    LogLevel["Error"] = "error";
    LogLevel["Warning"] = "warn";
    LogLevel["Information"] = "info";
    LogLevel["Verbose"] = "verbose";
    LogLevel["Debug"] = "debug";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
exports.logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.File({ filename: "error.log", level: "error" }),
    ],
    exceptionHandlers: [
        new winston_1.default.transports.File({ filename: "exceptions.log" }),
    ]
});
if (process.env.NODE_ENV !== "production") {
    exports.logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple()
    }));
}
