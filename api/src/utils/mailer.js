"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestCreds = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
async function createTestCreds() {
    const creds = await nodemailer_1.default.createTestAccount();
    console.log({ creds });
}
exports.createTestCreds = createTestCreds;
createTestCreds();
// eslint-disable-next-line @typescript-eslint/no-empty-function
async function sendEmail() { }
exports.default = sendEmail;
