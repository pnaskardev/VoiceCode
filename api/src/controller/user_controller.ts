import { Request,Response } from "express";
import {CreateUserInput} from '../schema/user_schema';
import { createUser } from "../service/user_service";
import sendEmail from "../utils/mailer";

// export async function createUserHandler(req:Request<Record<string, any>,Record<string, any>,CreateUserInput>,res:Response)
export async function createUserHandler(
    req: Request<Record<string, never>, Record<string, never>, CreateUserInput>,
    res: Response
) 
{
    const body=req.body;

    try 
    {
        const user=await createUser(body);
        await sendEmail();
        res.send("User succesfully created");    
    } catch (error:any) 
    {
        if(error.code===11000)
        {
            return res.status(409).send("Account already exists");
        }
        return res.status(500).send(error);    
    }
}