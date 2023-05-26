"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const user_service_1 = require("../service/user_service");
const mailer_1 = __importDefault(require("../utils/mailer"));
// export async function createUserHandler(req:Request<Record<string, any>,Record<string, any>,CreateUserInput>,res:Response)
async function createUserHandler(req, res) {
    const body = req.body;
    try {
        const user = await (0, user_service_1.createUser)(body);
        await (0, mailer_1.default)();
        res.send("User succesfully created");
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).send("Account already exists");
        }
        return res.status(500).send(error);
    }
}
exports.createUserHandler = createUserHandler;
