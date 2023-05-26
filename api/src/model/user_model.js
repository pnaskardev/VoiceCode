"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const argon2_1 = __importDefault(require("argon2"));
const nanoid_1 = require("nanoid");
// import * as nanoid from 'nanoid';
const observability_1 = require("../config/observability");
let User = class User {
    email;
    firstName;
    lastname;
    password;
    verificationCode;
    passwordResetCode;
    verified;
    async validatePassword(candidatePassword) {
        try {
            return await argon2_1.default.verify(this.password, candidatePassword);
        }
        catch (error) {
            observability_1.logger.error(error);
            return false;
        }
    }
};
__decorate([
    (0, typegoose_1.prop)({ lowercase: true, required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: () => (0, nanoid_1.nanoid)() }),
    __metadata("design:type", String)
], User.prototype, "verificationCode", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], User.prototype, "passwordResetCode", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
User = __decorate([
    (0, typegoose_1.pre)("save", async function () {
        if (!this.isModified("password")) {
            return;
        }
        const hash = await argon2_1.default.hash(this.password);
        this.password = hash;
    }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], User);
exports.User = User;
const UserModel = (0, typegoose_1.getModelForClass)(User);
exports.default = UserModel;
// import {
//     getModelForClass,
//     modelOptions,
//     prop,
//     Severity,
//     pre,
//     DocumentType,
//     index,
//   } from "@typegoose/typegoose";
//   import { nanoid } from "nanoid";
//   import argon2 from "argon2";
//   export const privateFields = [
//     "password",
//     "__v",
//     "verificationCode",
//     "passwordResetCode",
//     "verified",
//   ];
//   @pre<User>("save", async function () {
//     if (!this.isModified("password")) {
//       return;
//     }
//     const hash = await argon2.hash(this.password);
//     this.password = hash;
//     return;
//   })
//   @index({ email: 1 })
//   @modelOptions({
//     schemaOptions: {
//       timestamps: true,
//     },
//     options: {
//       allowMixed: Severity.ALLOW,
//     },
//   })
//   export class User {
//     @prop({ lowercase: true, required: true, unique: true })
//     email: string;
//     @prop({ required: true })
//     firstName: string;
//     @prop({ required: true })
//     lastName: string;
//     @prop({ required: true })
//     password: string;
//     @prop({ required: true, default: () => nanoid() })
//     verificationCode: string;
//     @prop()
//     passwordResetCode: string | null;
//     @prop({ default: false })
//     verified: boolean;
//     async validatePassword(this: DocumentType<User>, candidatePassword: string) {
//       try {
//         return await argon2.verify(this.password, candidatePassword);
//       } catch (e) {
//         return false;
//       }
//     }
//   }
//   const UserModel = getModelForClass(User);
//   export default UserModel;
