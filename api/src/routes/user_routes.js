"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_resource_1 = __importDefault(require("../middleware/validate_resource"));
const user_schema_1 = require("../schema/user_schema");
const user_controller_1 = require("../controller/user_controller");
const userRouter = express_1.default.Router();
userRouter.post("/api/users", (0, validate_resource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
exports.default = userRouter;
