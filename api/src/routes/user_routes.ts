import express from 'express';

import validateResource from '../middleware/validate_resource';
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema} from '../schema/user_schema';
import { createUserHandler, forgotPasswordHandler, resetPasswordHandler, verifyUserHandler } from '../controller/user_controller';


const userRouter =express.Router();

userRouter.post("/api/users",validateResource(createUserSchema),createUserHandler);

userRouter.post("/api/verify/:id/:verificationCode",validateResource(verifyUserSchema),verifyUserHandler);

userRouter.post("/api/users/forgotpassword",validateResource(forgotPasswordSchema),forgotPasswordHandler);

userRouter.post("/api/users/resetpassword/:id/:passwordResetCode",validateResource(resetPasswordSchema),resetPasswordHandler);

export default userRouter;