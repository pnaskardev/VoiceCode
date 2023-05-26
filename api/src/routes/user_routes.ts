import express from 'express';

import validateResource from '../middleware/validate_resource';
import { createUserSchema, forgotPasswordSchema, verifyUserSchema} from '../schema/user_schema';
import { createUserHandler, forgotPasswordHandler, verifyUserHandler } from '../controller/user_controller';


const userRouter =express.Router();

userRouter.post("/api/users",validateResource(createUserSchema),createUserHandler);

userRouter.post("/api/verify/:id/:verificationCode",validateResource(verifyUserSchema),verifyUserHandler);

userRouter.post("/api/users/forgotpassword",validateResource(forgotPasswordSchema),forgotPasswordHandler);

export default userRouter;