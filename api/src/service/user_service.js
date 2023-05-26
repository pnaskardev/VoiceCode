"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_model_1 = __importDefault(require("../model/user_model"));
function createUser(input) {
    return user_model_1.default.create(input);
}
exports.createUser = createUser;
