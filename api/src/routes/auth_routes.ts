import express from 'express';
import validateResource from '../middleware/validate_resource';
import { createSessionSchema } from '../schema/auth_schema';
import { createSessionHandler } from '../controller/auth_controller';

const authRouter =express.Router();

authRouter.post("/api/sessions",validateResource(createSessionSchema),createSessionHandler);

export default authRouter;