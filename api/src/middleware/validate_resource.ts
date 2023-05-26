import {Request,Response,NextFunction} from 'express';
import {AnyZodObject} from 'zod';
import { logger } from '../config/observability';

const validateResource=(schema:AnyZodObject)=>(req:Request,res:Response,next:NextFunction)=>
{
    try 
    {
        schema.parse({
            body:req.body,
            query:req.query,
            params:req.params
        });
        next();
    } catch (error:any) {
        console.log(error);
        logger.error(error.error);
        return res.status(400).send(error.error);
    }
};

export default validateResource;