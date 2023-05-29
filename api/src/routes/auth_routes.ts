import express from 'express';
import validateResource from '../middleware/validate_resource';
import { createSessionSchema } from '../schema/auth_schema';
import { createSessionHandler, refreshAccessTokenHandler } from '../controller/auth_controller';

const authRouter =express.Router();

// LOGIN ROUTE
authRouter.post("/api/sessions",validateResource(createSessionSchema),createSessionHandler);

// IF ACCESS TOKEN EXPIRES WE NEED TO REFRESH IT
// IF ACCESS TOKEN IS ALSO EXPIRED WE NEED TO LOGIN AGAIN 
authRouter.post("/api/sessions/refresh",refreshAccessTokenHandler);

export default authRouter;