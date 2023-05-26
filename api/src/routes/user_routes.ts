import express from 'express';

import validateResource from '../middleware/validate_resource';
import { createUserSchema } from '../schema/user_schema';
import { createUserHandler } from '../controller/user_controller';


const userRouter =express.Router();

userRouter.post("/api/users",validateResource(createUserSchema),createUserHandler);



export default userRouter;