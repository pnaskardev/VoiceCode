"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const observability_1 = require("../config/observability");
dotenv_1.default.config();
const connectToDb = async () => {
    try {
        await mongoose_1.default.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.arxjams.mongodb.net/?retryWrites=true&w=majority`);
        observability_1.logger.info('Connected to DB');
    }
    catch (e) {
        observability_1.logger.info(`ENV is ${e}`);
        process.exit(1);
    }
};
exports.connectToDb = connectToDb;
