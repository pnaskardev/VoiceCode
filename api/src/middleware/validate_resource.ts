import {Request,Response,NextFunction} from 'express';
import {AnyZodObject} from 'zod';
import { logger } from '../utils/observability';

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
        logger.error(error.errors[0]);
        return res.status(400).send({'error': error.errors[0].message});
    }
};

export default validateResource;