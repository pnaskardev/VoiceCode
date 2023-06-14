import express from 'express';

import validateResource from '../middleware/validate_resource';
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema} from '../schema/user_schema';
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, resetPasswordHandler, verifyUserHandler } from '../controller/user_controller';
import requireUser from '../middleware/require_user';


const userRouter =express.Router();

// SIGN UP HANDLER
userRouter.post("/api/users",validateResource(createUserSchema),createUserHandler);

// VERIFY USER HANDLER WITH EMAIL CODE
userRouter.post("/api/verify/:id/:verificationCode",validateResource(verifyUserSchema),verifyUserHandler);

userRouter.post("/api/users/forgotpassword",validateResource(forgotPasswordSchema),forgotPasswordHandler);

// RESET PASSWORD HANDLER
userRouter.post("/api/users/resetpassword/:id/:passwordResetCode",validateResource(resetPasswordSchema),resetPasswordHandler);

// GETTING THE CURRENT USER INFORMATION
userRouter.get("/api/users/me", requireUser,getCurrentUserHandler);

export default userRouter;

// 6489fc5a46ba926533840415